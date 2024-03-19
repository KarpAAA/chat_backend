import {Module} from '@nestjs/common';
import {MessagesService} from './messages.service';
import {MessagesController} from './messages.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Message, MessageSchema} from "../models/message.model";
import {Room, RoomSchema} from "../models/room.model";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Message.name, schema: MessageSchema},
            {name: Room.name, schema: RoomSchema}
        ])
    ],
    controllers: [MessagesController],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule {
}
