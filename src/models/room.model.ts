import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
    @Prop({unique: true})
    name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
