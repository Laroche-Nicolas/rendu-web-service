import { Module } from '@nestjs/common';
import { User, UserSchema } from '../models/user.model';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class MongoModule {}
