import { Struct, type InnerType} from "../deps.ts";
import { varIntString } from "../util_classes.ts";

export const loginStartCodec = new Struct({
    name: varIntString,
    // uuid: ,
});


export type LoginStartPacket = InnerType<typeof loginStartCodec>;