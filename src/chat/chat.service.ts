import { Injectable } from '@nestjs/common';
import {Socket} from "socket.io";

@Injectable()
export class ChatService {
    roomClients: string[] = [];
    clientList: string[] = [];
    maxConnections: number = 100;

    attendRoom(clientId:string){
        if(this.roomClients.length <= 1){
            this.roomClients.push(clientId);
            console.log({roomClients: this.roomClients});
            return true;
        }
        return false;
    }
    leaveRoom(clientId:string){
        this.roomClients = this.roomClients.filter(client => client !== clientId);
    }

    connect(client: Socket) {
        this.clientList.push(client.id);
        console.log(this.clientList.length);
        if(this.clientList.length > this.maxConnections) {
            this.leave(client.id)
            client.disconnect(true);
        }
    }

    leave(clientId:string){
        this.clientList = this.clientList.filter(client => client !== clientId);
    }
}
