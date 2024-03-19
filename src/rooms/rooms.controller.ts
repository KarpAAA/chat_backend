import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {RoomsService} from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {
    }

    @Get()
    findAll() {
        return this.roomsService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.roomsService.findOne(name);
    }

    @Post('')
    createNewChat(@Body() chat: any) {
        const {name} = chat;
        return this.roomsService.createNewChat(name);
    }
}
