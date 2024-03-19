import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../guards/jwt.guard";

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("/validate")
  async jwt(@Request() req) {
    return req.user;
  }
}
