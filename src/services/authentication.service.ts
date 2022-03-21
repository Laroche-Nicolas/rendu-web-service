import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

  registerUser = async (parameters: UserDto): Promise<User> => {
    const { email, password, firstname, lastname } = parameters;
    const existingUser = await this.findUserByMail(email);

    if (!!existingUser) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.insert({
      email,
      password,
      firstname,
      lastname,
    });

    return this.userRepository.findOneBy(user._id);
  };

  findUserByMail = (mail: string): Promise<User> =>
    this.userRepository.findOneBy({ email: mail });
}
