import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../services/authentication.service';
// import { LoginDTO } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from '../models/user.model';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Put('register')
  @ApiOperation({
    summary: 'Route for register an User',
    description: 'Route to register an user and return the user.',
  })
  registerUser(@Body() parameters: RegisterUserDto): Promise<User> {
    return this.authenticationService.registerUser(parameters);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Route for login an User',
    description: 'Route to login an user and get a JWT token.',
  })
  loginUser(@Body() parameters: LoginDTO): Promise<{ token: string }> {
    return this.authenticationService.login(parameters);
  }
}
