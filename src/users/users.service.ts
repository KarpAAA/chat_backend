import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            userId:1,
            username: "User1",
            password: "123321"
        },
        {
            userId:2,
            username: "User2",
            password: "123321"
        }
    ];

    async findUser(username: string){
        return this.users.find(u => u.username === username);
    }
}
