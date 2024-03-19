import {Injectable} from '@nestjs/common';
import {Model, Types} from "mongoose";
import {Message} from "../models/message.model";
import {InjectModel} from "@nestjs/mongoose";
import {Room} from "../models/room.model";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(Room.name) private roomModel: Model<Room>,
        ) {

    }

    async saveMessage(message: any): Promise<Message> {
        const room = await this.roomModel.findOne({_id: message.room._id}).exec();
        if(!room) throw new Error("Invalid room");
        console.log(room);
        const createdMessage =
            await this.messageModel.create({...message, room: room._id});
        return await createdMessage.save();
    }

    async getAllChatMessages(roomName: string): Promise<Message[]> {
        const room = await this.roomModel.findOne({name: roomName}).exec();
        if(!room) throw new Error("Room not found!");

        return await this.messageModel.find({room: room._id}).exec();
    }

    async clearConversation(roomName: string) {
        const room = await this.roomModel.findOne({name: roomName}).exec();
        if(!room) throw new Error("Room not found!");
        await this.messageModel.deleteMany({room: room._id}).exec();
    }

    async findLastRoomMessage(_id: Types.ObjectId) {
        const lastMessage = await this.messageModel.find({ room: _id })
            .sort({ createdAt: -1 })
            .limit(1)
            .exec();
        if(!lastMessage || lastMessage.length === 0) return '';
        return lastMessage[0].messageBody;
    }
}
