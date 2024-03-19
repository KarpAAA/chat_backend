import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService) {
    }

    async validateUser(username: string, password: string){
        const user = await this.userService.findUser(username);
        if(user && user.password === password){
            const {password, ...res} = user;
            return res;
        }
        return null;
    }

    async login(user:any){
        const payload = { username: user.username, sub: user.userId };
        return {
            token: this.jwtService.sign(payload),
            userId: user.userId
        }
    }

    async validateToken(auth: string): Promise<any> {
        const token = auth.split(' ')[1];
        try {
            return this.jwtService.verify(token);;
        } catch (err) {
            console.log(err);
        }
    }

}
