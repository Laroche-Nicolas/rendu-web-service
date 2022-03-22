import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../models/user.model';
import * as bCrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/user.dto';
import config from '../config';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  registerUser = async (parameters: UserDto): Promise<User> => {
    const { email, password, firstname, lastname } = parameters;
    const existingUser = await this.findUserByMail(email);

    if (!!existingUser) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.insert({
      email,
      firstname,
      lastname,
      isActive: true,
    });

    user.password = await this.encryptPassword(password);

    return user.save();
  };

  login = async (parameters: LoginDTO): Promise<{ token: string }> => {
    const user = await this.userRepository.findOneBy(
      { email: parameters.email },
      { hiddenPropertiesToSelect: ['password'] },
    );

    const passwordIsCorrect = await this.comparePassword({
      password1: parameters.password,
      password2: user?.password ?? '',
    });

    if (!passwordIsCorrect) {
      throw new UnauthorizedException();
    }

    return {
      token: this.createJwtToken(user),
      // refreshToken: await this.createRefreshToken(user),
    };
  };

  private findUserByMail = (email: string): Promise<User> =>
    this.userRepository.findOneBy({ email: email });

  private comparePassword = async ({
    password1,
    password2,
  }): Promise<boolean> => bCrypt.compare(password1, password2);

  private createJwtToken = (user: User): string =>
    jwt.sign({ _id: user._id }, config.jwt.secretKey, {
      expiresIn: config.jwt.expirationTime,
    });

  private encryptPassword = async (password: string): Promise<string> =>
    bCrypt.hash(password, 15);
}
