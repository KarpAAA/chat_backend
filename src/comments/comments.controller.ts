import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() comment: CreateCommentDto) {
    return this.commentsService.create(comment);
  }

  @Get(":messageId")
  findAll(@Param('messageId') messageId: string) {
    return this.commentsService.findAll(messageId);
  }

  @Get()
  findOne(@Query('messageId') messageId: string,
          @Query('commentId') commentId: string) {
    return this.commentsService.findOne(messageId, commentId);
  }

  @Patch()
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
