import {Module} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {RoomsController} from './rooms.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Room, RoomSchema} from "../models/room.model";
import {MessagesModule} from "../messages/messages.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Room.name, schema: RoomSchema}
        ]),
        MessagesModule
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
})
export class RoomsModule {
}
