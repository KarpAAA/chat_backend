import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {ChatService} from "./chat.service";
import {MessageDto} from "../dtos/message.dto";
import {Socket} from "socket.io";
import {DecryptPipe} from "../pipes/decrypt.pipe";
import {UseGuards, UsePipes} from "@nestjs/common";
import {WsThrottlerGuard} from "../guards/ws-throttler.guard";
import {AuthGuard} from "@nestjs/passport";
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {AuthService} from "../auth/auth.service";
import {MessagesService} from "../messages/messages.service";
import {Message} from "../models/message.model";

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    constructor(private readonly chatService: ChatService,
                private readonly authService: AuthService,
                private readonly messageService: MessagesService,
                ) {
    }

    @SubscribeMessage('message')
    @UseGuards(WsThrottlerGuard)
    @UsePipes(new DecryptPipe())
    async handleEvent(@ConnectedSocket() client: Socket, @MessageBody() message: Message){
        console.log(message);
        client.join("room");
        const savedMessage = await this.messageService.saveMessage(message);
        this.server.to("room").emit('message', savedMessage);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        if(!await this.verifyUser(client.handshake.headers.authorization))
            client.disconnect(true);

        console.log(client.handshake.headers.authorization);
        this.chatService.connect(client);
        console.log({socket: "Client connected " + client.id});

        if (this.chatService.attendRoom(client.id)) {
            console.log({socket: "Client joined " + client.id});
            client.join("room")
        }

    }

    private verifyUser(authHeader:string){
        if (!authHeader) {
            throw new Error('Unauthorized');
        }
        return this.authService.validateToken(authHeader);
    }



    handleDisconnect(client: Socket): any {
        this.chatService.leaveRoom(client.id);
        this.chatService.leave(client.id);
        console.log({socket: "Client disconnected " + client.id});
    }


}
