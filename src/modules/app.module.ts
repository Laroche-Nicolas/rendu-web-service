import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../services/app.service';
import { AuthenticationController } from '../controllers/authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import { RestaurantController } from '../controllers/restaurant.controller';
import { RestaurantService } from '../services/restaurant.service';
import { ReviewService } from '../services/review.service';
import { ReviewController } from '../controllers/review.controller';
import config from '../config';
import { MongoModule } from './mongo.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), MongoModule],
  controllers: [
    AppController,
    AuthenticationController,
    RestaurantController,
    ReviewController,
  ],
  providers: [
    AppService,
    AuthenticationService,
    RestaurantService,
    ReviewService,
  ],
})
export class AppModule {}
