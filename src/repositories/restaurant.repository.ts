import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { Restaurant, RestaurantDocument } from '../models/restaurant.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantRepository extends BaseRepository<RestaurantDocument> {
  constructor(
    @InjectModel(Restaurant.name) private model: Model<RestaurantDocument>,
  ) {
    super(model);
  }
}
