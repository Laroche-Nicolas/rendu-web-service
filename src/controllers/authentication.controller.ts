import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../services/authentication.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { LoginDTO } from '../dto/login.dto';
import { JWTGuard } from '../guards/jwt.guard';
import Any = jasmine.Any;

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Put('register')
  @ApiOperation({
    summary: 'Route for register an User',
    description: 'Route to register an user and return the user.',
  })
  registerUser(@Body() parameters: UserDto): Promise<User> {
    return this.authenticationService.registerUser(parameters);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Route to login an User',
    description: 'Route to login an user and get a JWT token.',
  })
  loginUser(@Body() parameters: LoginDTO): Promise<{ token: string }> {
    return this.authenticationService.login(parameters);
  }

  @Get('me')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route to get information about the current user',
    description: 'Route to get information about the current user.',
  })
  getMe(@Req() req: any) {
    return req.user;
  }
}
