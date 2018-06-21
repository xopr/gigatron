; New to assembly? Scroll down to "Code starts here" for the actual code

#cpudef
{
    #align 16

    LD      #{d}        -> 0x00 @ d[7:0]
    LD      #{d}        -> 0x000 @ d[3:0]
    LD      {d}         -> 0x01 @ d[7:0]
    NOP                 -> 0x0200
    LD      IN          -> 0x0300
    LD      X           -> 0x0500
    LD      Y, {d}      -> 0x09  @ d[7:0]

    LD      Y, X        -> 0x0d00
    LD      #{d}, X     -> 0x10 @ d[7:0]
    LD      {d}, X      -> 0x11 @ d[7:0]
    LD      AC, X       -> 0x1200
    LD      IN, X       -> 0x1300

    LD      #{d}, Y     -> 0x14 @ d[7:0]
    LD      {d}, Y      -> 0x15 @ d[7:0]
    LD      AC, Y       -> 0x1600
    LD      IN, Y       -> 0x1700

    LD      #{d}, OUT   -> 0x18 @ d[7:0]
    LD      {d}, OUT    -> 0x19 @ d[7:0]
    LD      AC, OUT     -> 0x1a00
    LD      IN, OUT     -> 0x1b00

    LDX     #{d}, OUT   -> 0x1c @ d[7:0]
    LDX     {d}, OUT    -> 0x1d @ d[7:0]
    LDX     AC, OUT     -> 0x1e00
    LDX     IN, OUT     -> 0x1f00


    ANDA    #{d}        -> 0x20 @ d[7:0]
    ANDA    #{d}        -> 0x200 @ d[3:0]
    ANDA    {d}         -> 0x21 @ d[7:0]

    ANDA    IN          -> 0x2300
    ANDA    X           -> 0x2500
    ANDA    Y, {d}      -> 0x29  @ d[7:0]

    ANDA    Y, X        -> 0x2d00
    ANDA    #{d}, X     -> 0x30 @ d[7:0]
    ANDA    {d}, X      -> 0x31 @ d[7:0]
    ANDA    AC, X       -> 0x3200
    ANDA    IN, X       -> 0x3300

    ANDA    #{d}, Y     -> 0x34 @ d[7:0]
    ANDA    {d}, Y      -> 0x35 @ d[7:0]
    ANDA    AC, Y       -> 0x3600
    ANDA    IN, Y       -> 0x3700

    ANDA    #{d}, OUT   -> 0x38 @ d[7:0]
    ANDA    {d}, OUT    -> 0x39 @ d[7:0]
    ANDA    AC, OUT     -> 0x3a00
    ANDA    IN, OUT     -> 0x3b00

    ANDAX   #{d}, OUT   -> 0x3c @ d[7:0]
    ANDAX   {d}, OUT    -> 0x3d @ d[7:0]
    ANDAX   AC, OUT     -> 0x3e00
    ANDAX   IN, OUT     -> 0x3f00


    ORA     #{d}        -> 0x40 @ d[7:0]
    ORA     #{d}        -> 0x400 @ d[3:0]
    ORA     {d}         -> 0x41 @ d[7:0]

    ORA     IN          -> 0x4300
    ORA     X           -> 0x4500
    ORA     Y, {d}      -> 0x49  @ d[7:0]

    ORA     Y, X        -> 0x4d00
    ORA     #{d}, X     -> 0x50 @ d[7:0]
    ORA     {d}, X      -> 0x51 @ d[7:0]
    ORA     AC, X       -> 0x5200
    ORA     IN, X       -> 0x5300

    ORA     #{d}, Y     -> 0x54 @ d[7:0]
    ORA     {d}, Y      -> 0x55 @ d[7:0]
    ORA     AC, Y       -> 0x5600
    ORA     IN, Y       -> 0x5700

    ORA     #{d}, OUT   -> 0x58 @ d[7:0]
    ORA     {d}, OUT    -> 0x59 @ d[7:0]
    ORA     AC, OUT     -> 0x5a00
    ORA     IN, OUT     -> 0x5b00

    ORAX    #{d}, OUT   -> 0x5c @ d[7:0]
    ORAX    {d}, OUT    -> 0x5d @ d[7:0]
    ORAX    AC, OUT     -> 0x5e00
    ORAX    IN, OUT     -> 0x5f00


    XORA    #{d}        -> 0x60 @ d[7:0]
    XORA    #{d}        -> 0x600 @ d[3:0]
    XORA    {d}         -> 0x61 @ d[7:0]

    XORA    IN          -> 0x6300
    XORA    X           -> 0x6500
    XORA    Y, {d}      -> 0x69  @ d[7:0]

    XORA    Y, X        -> 0x6d00
    XORA    #{d}, X     -> 0x70 @ d[7:0]
    XORA    {d}, X      -> 0x71 @ d[7:0]
    XORA    AC, X       -> 0x7200
    XORA    IN, X       -> 0x7300

    XORA    #{d}, Y     -> 0x74 @ d[7:0]
    XORA    {d}, Y      -> 0x75 @ d[7:0]
    XORA    AC, Y       -> 0x7600
    XORA    IN, Y       -> 0x7700

    XORA    #{d}, OUT   -> 0x78 @ d[7:0]
    XORA    {d}, OUT    -> 0x79 @ d[7:0]
    XORA    AC, OUT     -> 0x7a00
    XORA    IN, OUT     -> 0x7b00

    XORAX   #{d}, OUT   -> 0x7c @ d[7:0]
    XORAX   {d}, OUT    -> 0x7d @ d[7:0]
    XORAX   AC, OUT     -> 0x7e00
    XORAX   IN, OUT     -> 0x7f00


    ADDA    #{d}        -> 0x80 @ d[7:0]
    ADDA    #{d}        -> 0x800 @ d[3:0]
    ADDA    {d}         -> 0x81 @ d[7:0]

    ADDA    IN          -> 0x8300
    ADDA    X           -> 0x8500
    ADDA    Y, {d}      -> 0x89  @ d[7:0]

    ADDA    Y, X        -> 0x8d00
    ADDA    #{d}, X     -> 0x90 @ d[7:0]
    ADDA    {d}, X      -> 0x91 @ d[7:0]
    ADDA    AC, X       -> 0x9200
    ADDA    IN, X       -> 0x9300

    ADDA    #{d}, Y     -> 0x94 @ d[7:0]
    ADDA    {d}, Y      -> 0x95 @ d[7:0]
    ADDA    AC, Y       -> 0x9600
    ADDA    IN, Y       -> 0x9700

    ADDA    #{d}, OUT   -> 0x98 @ d[7:0]
    ADDA    {d}, OUT    -> 0x99 @ d[7:0]
    ADDA    AC, OUT     -> 0x9a00
    ADDA    IN, OUT     -> 0x9b00

    ADDAX   #{d}, OUT   -> 0x9c @ d[7:0]
    ADDAX   {d}, OUT    -> 0x9d @ d[7:0]
    ADDAX   AC, OUT     -> 0x9e00
    ADDAX   IN, OUT     -> 0x9f00


    SUBA    #{d}        -> 0xa0 @ d[7:0]
    SUBA    #{d}        -> 0xa00 @ d[3:0]
    SUBA    {d}         -> 0xa1 @ d[7:0]

    SUBA    IN          -> 0xa300
    SUBA    X           -> 0xa500
    SUBA    Y, {d}      -> 0xa9  @ d[7:0]

    SUBA    Y, X        -> 0xad00
    SUBA    #{d}, X     -> 0xb0 @ d[7:0]
    SUBA    {d}, X      -> 0xb1 @ d[7:0]
    SUBA    AC, X       -> 0xb200
    SUBA    IN, X       -> 0xb300

    SUBA    #{d}, Y     -> 0xb4 @ d[7:0]
    SUBA    {d}, Y      -> 0xb5 @ d[7:0]
    SUBA    AC, Y       -> 0xb600
    SUBA    IN, Y       -> 0xb700

    SUBA    #{d}, OUT   -> 0xb8 @ d[7:0]
    SUBA    {d}, OUT    -> 0xb9 @ d[7:0]
    SUBA    AC, OUT     -> 0xba00
    SUBA    IN, OUT     -> 0xbb00

    SUBAX   #{d}, OUT   -> 0xbc @ d[7:0]
    SUBAX   {d}, OUT    -> 0xbd @ d[7:0]
    SUBAX   AC, OUT     -> 0xbe00
    SUBAX   IN, OUT     -> 0xbf00

    ST      #{d}, {_d} -> 0xc0 @ d[7:0]
    ST      {d}         -> 0xc2 @ d[7:0]
    ST      IN, {d}     -> 0xc3 @ d[7:0]
    ST      #{d}, X     -> 0xc4 @ d[7:0]
    ST      X           -> 0xc600
    ST      IN, X       -> 0xc700
    ST      #{d}, Y, {_d}-> 0xc8 @ d[7:0]
    ST      Y, {d}      -> 0xca @ d[7:0]
    ST      IN, Y, {_d}  -> 0xcb @ d[7:0]
    ST      #{d}, Y, X  -> 0xcc @ d[7:0]
    ST      Y, X        -> 0xce00
    ST      IN, Y, X    -> 0xcf00

    ST      #{d}, {_d}, X-> 0xd0 @ d[7:0]
    ST      {d}, X      -> 0xd2 @ d[7:0]
    ST      IN, {d}, X  -> 0xd3 @ d[7:0]
    ST      #{d}, {_d}, Y-> 0xd4 @ d[7:0]
    ST      {d}, Y      -> 0xd6 @ d[7:0]
    ST      IN, {d}, Y  -> 0xd7 @ d[7:0]
    ST      #{d}, {_d}, OUT -> 0xd8 @ d[7:0]
    ST      {d}, OUT    -> 0xda @ d[7:0]
    ST      IN, {d}, OUT-> 0xdb @ d[7:0]
    ST      #{d}, Y, X++-> 0xdc @ d[7:0]
    ST      Y, X++      -> 0xde00
    ST      IN, Y, X++  -> 0xdf00

    JMP Y, #{d}         -> 0xe0 @ d[7:0]    ; #d, .d
    JMP Y, {d}          -> 0xe1 @ d[7:0]    ;
    JMP Y, AC           -> 0xe200
    JMP Y, IN           -> 0xe300

    BGT #{d}            -> 0xe4 @ d[7:0]
    BGT {d}             -> 0xe5 @ d[7:0]
    BGT AC              -> 0xe600
    BGT IN              -> 0xe700

    BLT #{d}            -> 0xe8 @ d[7:0]
    BLT {d}             -> 0xe9 @ d[7:0]
    BLT AC              -> 0xea00
    BLT IN              -> 0xeb00

    BNE #{d}            -> 0xec @ d[7:0]
    BNE {d}             -> 0xed @ d[7:0]
    BNE AC              -> 0xee00
    BNE IN              -> 0xef00

    BEQ #{d}            -> 0xf0 @ d[7:0]
    BEQ {d}             -> 0xf1 @ d[7:0]
    BEQ AC              -> 0xf200
    BEQ IN              -> 0xf300

    BGE #{d}            -> 0xf4 @ d[7:0]
    BGE {d}             -> 0xf5 @ d[7:0]
    BGE AC              -> 0xf600
    BGE IN              -> 0xf700

    BLE #{d}            -> 0xf8 @ d[7:0]
    BLE {d}             -> 0xf9 @ d[7:0]
    BLE AC              -> 0xfa00
    BLE IN              -> 0xfb00

    BRA #{d}            -> 0xfc @ d[7:0]
    BRA {d}             -> 0xfd @ d[7:0]
    BRA AC              -> 0xfe00
    BRA IN              -> 0xff00
}


; Code starts here:
; This is a comment. Comments start with ; and are not read by the assembler


; Hello world
; -----------
    ; Put LED |O*O*| pattern onto the bus (note that it is mirrored)
    ld  #0b1010             ; Operand onto the bus, load bus into AC

    ; load: operand to bus, ram address [0D] to ALU destunation OUT
    ; Toggle hSync low and back to high to latch AC into XOUT
    ld  #0b10000000, out    ; Operand (hSync low) onto the bus, load bus into OUT
    ld  #0b11000000, out    ; Operand (hSync high) onto the bus, load bus into OUT

    ; Run an empty loop
endless_loop:
    bra #endless_loop       ; Jump to direct #label
    nop                     ; Note that before any branch, the next instruction is already loaded; do a no-operation here

