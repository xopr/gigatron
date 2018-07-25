Gigatron Simulator / Assembler
==============================

This simulator is a quick-hack; a merge between https://github.com/PhilThomas/gigatron and https://github.com/hlorenzi/customasm to allow real-time assembling / debugging of the Gigatron simulator

The simulator loads the ROM using an `XmlHttpRequest`, so the application must be served up over HTTP.

The `package.json` can install an HTTP server, just do:

    npm install

Download [`ROMv2.rom`](https://github.com/kervinck/gigatron-rom/blob/master/ROMv2.rom) into the `src` directory.

Start the HTTP server

    npm start

Point your browser at [localhost:8000/src](localhost:8000/src).

Click on the canvas (Gigatron screen) to give it keyboard focus
Use the cursor keys for the D-pad.

## GT1 Files

GT1 files can be loaded by starting the `Loader` and dropping a `.gt1` file onto the VGA display from File Explorer or Finder.

## Assembler
* Uncheck `Run` to pause the emulator.
* use one of the `load ..` buttons to load a sample program (including the CPU definition of the Gigatron)
* Use `assemble` to assemble and upload the instructions
* `reset` resets the program pointer
* Use `step` for one clockcycle
* `auto` will try to assemble and upload automatically after each keypress
* `NOP` padding pads the rest of the program ROM with 'no-operation' instructions

### Notes
* The first section of the assembly (`#cpudef`) is used to translate mnemonics to HEX codes (which are used to create the actual ROM binary)
* Currently, only the first 16 bytes of RAM are displayed

### TODO:
* `export asm` button: export the current assembly instructions onto the local harddisk
* `export hex` button: export the hex (intermediate code) onto the local harddisk
* `export rom` button: export the binary rom for usage on a real EPROM
* Look into a way for a hardware acurate input (and allow support for keyboard)
