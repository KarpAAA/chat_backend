import {Prop, Schema} from "@nestjs/mongoose";


@Schema({timestamps: true})
export class Answer {
    @Prop()
    userId: string;

    @Prop()
    answerBody: string;
}
