import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import {PassportModule} from "@nestjs/passport";
import {ThrottlerModule} from "@nestjs/throttler";
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import {MessagesModule} from "./messages/messages.module";
import { CommentsModule } from './comments/comments.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
      ThrottlerModule.forRoot([{
          ttl: 60000,
          limit: 100,
      }]),
      MongooseModule.forRoot("mongodb://localhost:27017/chatDB"),
      ChatModule,
      AuthModule,
      PassportModule,
      UsersModule,
      MessagesModule,
      CommentsModule,
      RoomsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
