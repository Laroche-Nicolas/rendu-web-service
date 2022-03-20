import { Module } from '@nestjs/common';
import { User, UserSchema } from '../models/user.model';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [],
  exports: [],
})
export class MongoModule {}
