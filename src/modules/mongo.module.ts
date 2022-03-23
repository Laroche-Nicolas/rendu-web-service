import { Module } from '@nestjs/common';
import { User, UserSchema } from '../models/user.model';
import { Restaurant, RestaurantSchema } from '../models/restaurant.model';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '../repositories/user.repository';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Review, ReviewSchema } from '../models/review.model';
import { ReviewRepository } from '../repositories/review.repository';

@Module({
  imports: [
    NestMongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  providers: [UserRepository, RestaurantRepository, ReviewRepository],
  exports: [UserRepository, RestaurantRepository, ReviewRepository],
})
export class MongoModule {}
