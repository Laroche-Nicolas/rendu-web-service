import { Controller, Get, UseGuards } from '@nestjs/common';
import { JWTGuard } from '../guards/jwt.guard';
import { AppService } from '../services/app.service';
import { ApiSecurity } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  getHello(): string {
    return this.appService.getHello();
  }
}
