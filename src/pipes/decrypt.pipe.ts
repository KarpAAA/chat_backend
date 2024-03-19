import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as CryptoJS from "crypto-js";
import {Message} from "../models/message.model";

@Injectable()
export class DecryptPipe implements PipeTransform {
    transform(message: any, metadata: ArgumentMetadata) : Message{
        if(metadata.metatype === Message){
            const bytes = CryptoJS.AES.decrypt(message.messageBody, "XkhZG4fW2t2W");
            return {...message, messageBody: JSON.parse(bytes.toString(CryptoJS.enc.Utf8))};
        }
        return message;
    }
}