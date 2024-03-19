import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Room} from "../models/room.model";
import {MessagesService} from "../messages/messages.service";

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Room.name) private roomRepository: Model<Room>, private messageService: MessagesService) {
    }

    async findAll() {
        const allChats = await this.roomRepository.find().exec();
        const lastMessagesPromises =
            allChats.map(chat => this.messageService.findLastRoomMessage(chat._id));

        const lastMessages = await Promise.all(lastMessagesPromises);

        let index = 0;
        return allChats.map((chat) => {
            return {...(chat.toObject()), lastMessage: lastMessages[index++]};
        });
    }

    findOne(name: string) {
        return `This action returns a #${name} room`;
    }

    async createNewChat(name: string) {
        const newRoom = this.roomRepository.create({name});
        return newRoom;
    }
}
