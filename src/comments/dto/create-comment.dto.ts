import {Answer} from "../../models/answer.model";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    messageId: string

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    commentBody: string;
}
