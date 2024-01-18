import { Struct, type InnerType} from "../deps.ts";
import { varIntString, u128 } from "../util_classes.ts";

export const loginStartCodec = new Struct({
    name: varIntString,
    uuid: u128,
});


export type LoginStartPacket = InnerType<typeof loginStartCodec>;