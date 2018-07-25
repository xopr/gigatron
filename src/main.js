import {
    Vga,
} from './vga.js';
import {
    BlinkenLights,
} from './blinkenlights.js';
import {
    Gigatron,
} from './gigatron.js';
import {
    Gamepad,
} from './gamepad.js';
import {
    Audio,
} from './audio.js';
import {
    Loader,
} from './loader.js';

const {
    finalize,
} = rxjs.operators;

const HZ = 6250000;
const romUrl = 'ROMv2.rom';

$(function() {
    $('[data-toggle="tooltip"]').tooltip();

    let muteButton = $('#mute');
    let unmuteButton = $('#unmute');
    let volumeSlider = $('#volume-slider');
    let vgaCanvas = $('#vga-canvas');
    let loadFileInput = $('#load-file-input');


    let g_wasm = null;
    let g_assembly = null;

    let keyboardButton = $('#keyboard-check');
    let helloWorldButton = $('#load-hello-world');
    let blinkingLedButton = $('#load-blinking-led');
    let pauseButton = $('#pause-check');
    let stepButton = $('#step-button');
    let resetButton = $('#reset-button');
    let assembleButton = $('#assemble-button');
    let assembleCheck = $('#auto-assemble');
    let zeroPadding = $('#zero-padding');
    let exportAsm = $('#export-asm');
    let exportHex = $('#export-hex');
    let exportRom = $('#export-rom');

    function makeRustString(str)
    {
	    let bytes = new TextEncoder("utf-8").encode(str)
	    let ptr = g_wasm.instance.exports.wasm_string_new(bytes.length)
	    for (let i = 0; i < bytes.length; i++)
		    g_wasm.instance.exports.wasm_string_set_byte(ptr, i, bytes[i])
	    return ptr
    }

    function readRustString(ptr)
    {
	    let len = g_wasm.instance.exports.wasm_string_get_len(ptr)
	    let bytes = []
	    for (let i = 0; i < len; i++)
		    bytes.push(g_wasm.instance.exports.wasm_string_get_byte(ptr, i))
	    let str = new TextDecoder("utf-8").decode(new Uint8Array(bytes))
	    return str
    }

    function dropRustString(ptr)
    {
	    g_wasm.instance.exports.wasm_string_drop(ptr)
    }

    function assemble( _code, _type )
    {
	    if (g_wasm == null)
		    return;

	    let asmPtr = makeRustString( _code );
	    let outputPtr = null;
	    try
	    {
		    outputPtr = g_wasm.instance.exports.wasm_assemble( _type === 4 ? 2 : _type, asmPtr);
	    }
	    catch (e)
	    {
		    alert("Error assembling!\n\n" + e);
		    throw e;
	    }

	    let output = readRustString(outputPtr);
	    dropRustString(asmPtr);
	    dropRustString(outputPtr);


	    if ( output.match( /\x1b\[0m\x1b\[91m/g ) )
        {
            console.error( output );
            return;
        }

        console.log( output.match(/.{1,4}/g ).join( "\n" ) );

        //let data = new ArrayBuffer( output.length / 2 );
        //let longInt16View = new Uint16Array( data );

        let romData = new DataView( cpu.rom.buffer );
        let wordCount = romData.byteLength >> 1;

        if ( zeroPadding.is(":checked") )
        {
            for (var i = 0; i < cpu.rom.length; i += 2 )
            {
                // convert to host endianess
                romData.setInt16( i, 2 )
            }
        }

        let bytes = 4;
        for (var i = 0; i < output.length; i += bytes )
        {
            // convert to host endianess
            romData.setInt16( i / 2, parseInt( output.substr(i, bytes), 16), true )
        }

        if ( _type === 4 )
        {
            // TODO: make sure to save as  little endian
            //var blob = new Blob( [romData], {type: "application/octet-stream"} );
            var blob = new Blob( [romData], {type: "octet/stream"} );
            //download( "ROMv2.rom", blob );
        }
    }

    let assemblerTextArea = $('#assembler-textarea');

	fetch("customasm.gc.wasm")
		.then(r => r.arrayBuffer())
		.then(r => WebAssembly.instantiate(r))
		.then(wasm =>
		{
			g_wasm = wasm
			//document.getElementById("buttonAssemble").disabled = false
		});

    keyboardButton
        .on('click', (event) => {

            gamepad.mode = 1 - gamepad.mode;
            /*
            if ( keyboardButton.is(":checked") )
            {
                gamepad.mode = 1 - gamepad.mode;
            }
            else
            {
                gamepad.mode = 1 - gamepad.mode;
            }
            */
        } );

    helloWorldButton
        .on('click', (event) => {
            fetch("../examples/hello%20world.asm")
            .then(r => r.text())
            .then(r => assemblerTextArea.text(r))
        } )

    blinkingLedButton
        .on('click', (event) => {
            fetch("../examples/blinking%20led.asm")
            .then(r => r.text())
            .then(r => assemblerTextArea.text(r))
        } );

    pauseButton
        .on('click', (event) => {
            if ( pauseButton.is(":checked") )
            {
                startRunLoop()
            }
            else
            {
                stopRunLoop();
                cpu.debugInfo( true );
            }
        } );

    stepButton
        .on('click', (event) => {
            tick();
        });

    resetButton
        .on('click', (event) => {
            //cpu.reset();
            cpu.pc = 0;
            cpu.nextpc = (cpu.pc + 1) & cpu.romMask;

            cpu.debugInfo( !pauseButton.is(":checked") );
        })

    assembleButton
        .on('click', (event) => {
            assemble( assemblerTextArea.val(), 2 ); //download = 4
        });

    assemblerTextArea
        .on('keyup', (event) => {
            if ( assembleCheck.is(":checked") && g_assembly !== assemblerTextArea.val() )
            {
                g_assembly = assemblerTextArea.val();
                assemble( g_assembly, 2 ); //download = 4
            }
        });


    /** Trigger a keydown/keyup event in response to a mousedown/mouseup event
     * @param {JQuery} $button
     * @param {string} key
     */
    function bindKeyToButton($button, key) {
        $button
            .on('mousedown', (event) => {
                event.preventDefault();
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    'key': key,
                }));
                $button.addClass('pressed');
            })
            .on('mouseenter', (event) => {
                event.preventDefault();
                if (event.originalEvent.buttons & 1) {
                    document.dispatchEvent(new KeyboardEvent('keydown', {
                        'key': key,
                    }));
                    $button.addClass('pressed');
                }
            })
            .on('mouseup mouseleave', (event) => {
                event.preventDefault();
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    'key': key,
                }));
                $button.removeClass('pressed');
            });
    }

    bindKeyToButton($('.gamepad-btn-a'), 'A');
    bindKeyToButton($('.gamepad-btn-b'), 'S');
    bindKeyToButton($('.gamepad-btn-start'), 'W');
    bindKeyToButton($('.gamepad-btn-select'), 'Q');
    bindKeyToButton($('.gamepad-btn-up'), 'ArrowUp');
    bindKeyToButton($('.gamepad-btn-down'), 'ArrowDown');
    bindKeyToButton($('.gamepad-btn-left'), 'ArrowLeft');
    bindKeyToButton($('.gamepad-btn-right'), 'ArrowRight');

    // jQuery targets of current touches indexed by touch identifier
    let $touchTargets = {};

    // track touches within the fc30 and map them to mouse events
    $('.gamepad')
        .on('touchstart', (event) => {
            event.preventDefault();
            for (let touch of event.changedTouches) {
                let $currTarget = $(document.elementFromPoint(
                        touch.clientX, touch.clientY))
                    .filter('.gamepad-btn');
                $touchTargets[touch.identifier] = $currTarget;
                $currTarget.trigger('mousedown');
                if ($currTarget.length > 0 && navigator.vibrate) {
                    navigator.vibrate(20);
                }
            }
        })
        .on('touchmove', (event) => {
            event.preventDefault();
            for (let touch of event.changedTouches) {
                let $prevTarget = $touchTargets[touch.identifier];
                let $currTarget = $(document.elementFromPoint(
                        touch.clientX, touch.clientY))
                    .filter('.gamepad-btn');
                if ($prevTarget.get(0) != $currTarget.get(0)) {
                    $prevTarget.trigger('mouseup');
                    $touchTargets[touch.identifier] = $currTarget;
                    $currTarget.trigger('mousedown');
                    if ($currTarget.length > 0 && navigator.vibrate) {
                        navigator.vibrate(20);
                    }
                }
            }
        })
        .on('touchend touchcancel', (event) => {
            event.preventDefault();
            for (let touch of event.changedTouches) {
                let $prevTarget = $touchTargets[touch.identifier];
                $prevTarget.trigger('mouseup');
                delete $touchTargets[touch.identifier];
            }
        });

    /** display the error modal with the given message
     * @param {JQuery} body
     */
    function showError(body) {
        $('#error-modal-body')
            .empty()
            .append(body);
        $('#error-modal').modal();
    }

    let cpu = new Gigatron({
        hz: HZ,
        romAddressWidth: 16,
        ramAddressWidth: 15,
    });

    let vga = new Vga(vgaCanvas.get(0), cpu, {
        horizontal: {
            frontPorch: 16,
            backPorch: 48,
            visible: 640,
        },
        vertical: {
            frontPorch: 10,
            backPorch: 34,
            visible: 480,
        },
    });

    let blinkenLights = new BlinkenLights(cpu);

    let audio = new Audio(cpu);

    let gamepad = new Gamepad(cpu, {
        up: ['ArrowUp'],
        down: ['ArrowDown'],
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
        select: ['Q', 'q'],
        start: ['W', 'w'],
        a: ['A', 'a'],
        b: ['S', 's'],
    });

    let loader = new Loader(cpu);

    muteButton.click(function() {
        audio.mute = true;
        $([muteButton, unmuteButton]).toggleClass('d-none');
    });

    unmuteButton.click(function() {
        audio.mute = false;
        $([muteButton, unmuteButton]).toggleClass('d-none');
    });

    volumeSlider.val(100 * audio.volume);
    volumeSlider.on('input', function(event) {
        let target = event.target;
        target.labels[0].textContent = target.value + '%';
        audio.volume = target.value / 100;
    });
    volumeSlider.trigger('input');

    let timer = null;

    /** load a GT1 file
     * @param {File} file
     */
    function loadGt1(file) {
        gamepad.stop();
        loader.load(file)
            .pipe(finalize(() => {
                gamepad.start();
            }))
            .subscribe({
                error: (error) => showError($(`\
                <p>\
                    Could not load GT1 from <code>${file.name}</code>\
                </p>\
                <hr>\
                <p class="alert alert-danger">\
                    <span class="oi oi-warning"></span> ${error.message}\
                </p>`)),
            });
    }

    loadFileInput
        .on('click', (event) => {
            loadFileInput.closest('form').get(0).reset();
        })
        .on('change', (event) => {
            let target = event.target;
            if (target.files.length != 0) {
                let file = target.files[0];
                loadGt1(file);
            }
        });

    $(document)
        .on('dragenter', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let dataTransfer = event.originalEvent.dataTransfer;
            dataTransfer.dropEffect = 'link';
        })
        .on('dragover', (event) => {
            event.preventDefault();
            event.stopPropagation();
        })
        .on('drop', (event) => {
            let dataTransfer = event.originalEvent.dataTransfer;
            if (dataTransfer) {
                let files = dataTransfer.files;
                if (files.length != 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    loadGt1(files[0]);
                }
            }
        });

    // CPU Step
    function tick()
    {
        audio.drain();
        cpu.tick( true );
        vga.tick();
        audio.tick();
        loader.tick();
        blinkenLights.tick(); // don't need realtime update
        gamepad.tick();
    }

    /** start the simulation loop */
    function startRunLoop() {
        gamepad.start();

        timer = setInterval(() => {
            /* advance the simulation until the audio queue is full,
             * or 10ms of simulated time has passed.
             */
            let cycles = cpu.hz / 100;
            audio.drain();
            while (cycles-- >= 0 && !audio.full) {
                cpu.tick();
                vga.tick();
                audio.tick();
                loader.tick();
            }
            blinkenLights.tick(); // don't need realtime update
            gamepad.tick();
        }, audio.duration);

        audio.context.resume();

        // Chrome suspends the AudioContext on reload
        // and doesn't allow it to be resumed unless there
        // is user interaction
        if (audio.context.state === 'suspended') {
            vga.ctx.fillStyle = 'white';
            vga.ctx.textAlign = 'center';
            vga.ctx.textBaseline = 'middle';
            vga.ctx.font = '4em sans-serif';
            vga.ctx.fillText('Click to start', 320, 240);
            vgaCanvas.on('click', (event) => {
                audio.context.resume();
                vgaCanvas.off('click');
            });
        }
    }

    /** stop the simulation loop */
    function stopRunLoop() { // eslint-disable-line
        clearTimeout(timer);
        timer = null;
        gamepad.stop();
    }

    /** load the ROM image
     * @param {string} url
     */
    function loadRom(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.responseType = 'arraybuffer';
        req.onload = (event) => {
            if (req.status != 200) {
                showError($(`\
                    <p>\
                        Could not load ROM from <code>${url}</code>\
                    </p>\
                    <hr>\
                    <p class="alert alert-danger">\
                        <span class="oi oi-warning"></span> ${req.statusText}\
                    </p>`));
            } else {
                let dataView = new DataView(req.response);
                let wordCount = dataView.byteLength >> 1;
                // convert to host endianess
                for (let wordIndex = 0; wordIndex < wordCount; wordIndex++) {
                    cpu.rom[wordIndex] = dataView.getUint16(2 * wordIndex);
                }
                startRunLoop();
            }
        };

        req.send(null);
    }

    loadRom(romUrl);
});
