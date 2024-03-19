import {Prop, Schema} from "@nestjs/mongoose";
import {Answer} from "./answer.model";
import {HydratedDocument} from "mongoose";


export type CommentDocument = HydratedDocument<Comment>;
@Schema({timestamps: true})
export class Comment {
    @Prop()
    userId: string;

    @Prop()
    commentBody: string;

    @Prop({type: [Answer]})
    answers?: Answer[];
}
