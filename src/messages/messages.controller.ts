import {Controller, Get, Param, Post} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {

  }
  @Get(':room')
  private getAllChatMessage(@Param('room') room: string ){
    return this.messagesService.getAllChatMessages(room);
  }

  @Post("clear/:room")
  private clearConversation(@Param('room') room: string) {
    return this.messagesService.clearConversation(room);
  }
}
