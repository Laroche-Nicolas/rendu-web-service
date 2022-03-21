import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../services/authentication.service';
// import { LoginDTO } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.model';

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
}
