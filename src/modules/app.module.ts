import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../services/app.service';
import { AuthenticationController } from '../controllers/authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import config from '../config';
import { MongoModule } from './mongo.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), MongoModule],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, AuthenticationService],
})
export class AppModule {}
