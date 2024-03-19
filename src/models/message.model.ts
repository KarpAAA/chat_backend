import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";
import {Comment} from "./comment.model";
import {Room} from "./room.model";

export type MessageDocument = HydratedDocument<Message>;
@Schema({timestamps: true})
export class Message {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Room'})
    room: Room;

    @Prop()
    userId: string;

    @Prop()
    messageBody: string;

    @Prop({type: [Comment] })
    comments: Comment[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);