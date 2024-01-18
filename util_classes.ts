import { i32leb128, Options, Strings, UnsizedType } from "./deps.ts";

export class VarIntString extends UnsizedType<string> {
    constructor() {
        super(1);
    }

    readPacked(dt: DataView, options: Options = { byteOffset: 0}): string {
        const len = i32leb128.readPacked(dt, options);
        const strCodec = new Strings.FixedLength(len);

        return strCodec.readPacked(dt, options);
    }

    writePacked(value: string, dt: DataView, options: Options = { byteOffset: 0}): void {
        i32leb128.writePacked(value.length, dt, options);
        const strCodec = new Strings.FixedLength(value.length);
        strCodec.writePacked(value, dt, options);
    }
}




/**
 * Encoded as an unsigned 128-bit integer (or two unsigned 64-bit integers: the most significant 64 bits and then the least significant 64 bits)
*/
export class U128 extends UnsizedType<bigint> {
    constructor() {
        super(16);
    }
    
    readPacked(dt: DataView, options: Options = { byteOffset: 0}): bigint {
        const high = dt.getBigUint64(options.byteOffset, false);
        const low = dt.getBigUint64(options.byteOffset + 8, false);
        return (high << 64n) + low;
    }
    
    writePacked(value: bigint, dt: DataView, options: Options = { byteOffset: 0}): void {
        dt.setBigUint64(options.byteOffset, value >> 64n, false);
        dt.setBigUint64(options.byteOffset + 8, value & 0xFFFFFFFFFFFFFFFFn, false);
    }
}

export const varIntString = new VarIntString();
export const u128 = new U128();

