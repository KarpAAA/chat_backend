import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {LocalStrategy} from "./local.strategy";
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {constants} from "../constants";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: constants.JWT_SECRET,
            signOptions: {
                expiresIn: "24h"
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports:[AuthService]
})
export class AuthModule {
}