import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Message} from "../models/message.model";
import {Model} from "mongoose";
import {Comment} from "../models/comment.model";
import {Answer} from "../models/answer.model";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
    }

    async create(createCommentDto: CreateCommentDto) {
        console.log(createCommentDto);
        const message =
            await this.messageModel.findOne({_id: createCommentDto.messageId}).exec();
        if (message) {
            message.comments.push(createCommentDto);
            return await message.save();
        }
        throw new Error("Message not found")
    }

    async findAll(messageId: string) {
        const message =
            await this.messageModel.findOne({_id: messageId}).exec();
        if (message) {
            return message.comments;
        }
        throw new Error("Message not found")
    }

    async findOne(messageId: string, commentId: string) {
        const message: any =
            await this.messageModel.findOne({_id: messageId}).exec();
        if (message) {
            const comment: Comment = message.comments.find(comment => comment._id.toString() === commentId);
            if (comment) {
                return comment;
            }
            throw new Error("Comment not found");
        }
        throw new Error("Message not found");
    }

    async update({ messageId, commentId, ...updateCommentDto }) {
        const message: any = await this.messageModel.findOne({ _id: messageId }).exec();

        if (message) {
            const index = message.comments.findIndex(comment => comment._id.toString() === commentId);
            if (index === -1) throw new Error("Comment not found");
            message.comments[index] = { ...message.comments[index], ...updateCommentDto };

            return await message.save();
        }
        throw new Error("Message not found");
    }
    async remove(commentId: string) {
        await this.messageModel.updateOne(
            {"comments._id": commentId},
            {$pull: {comments: {_id: commentId}}} // Видалення коментаря з масиву comments
        ).exec();
    }

    async answerComment(commentId: string, answer: Answer){
        await this.messageModel.findOne(
            {"comments._id": commentId},
            {comments: {}}
        ).exec();
    }
}
