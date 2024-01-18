import { u8, Struct, VarInts, type InnerType, u16be } from "../deps.ts";
import { varIntString } from "../util_classes.ts";

/**
 * This causes the server to switch into the target state.
 */
export const handshakeCodec = new Struct({
    protocolVersion: VarInts.i32leb128,
    serverAddress: varIntString,
    serverPort: u16be,
    nextState: u8, 
});

export type HandshakePacket = InnerType<typeof handshakeCodec>;
