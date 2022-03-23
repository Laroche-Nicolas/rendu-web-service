import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { Review, ReviewDocument } from '../models/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewRepository extends BaseRepository<ReviewDocument> {
  constructor(@InjectModel(Review.name) private model: Model<ReviewDocument>) {
    super(model);
  }
}
