import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Review } from '../models/review.model';
import { ReviewRepository } from '../repositories/review.repository';
import { reviewDto, updateReviewDto } from '../dto/review.dto';
import { Restaurant } from '../models/restaurant.model';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  addReview = async (
    parameters: reviewDto,
    userId: string,
  ): Promise<Review> => {
    const { dateVisit, rating, restaurantId, description } = parameters;

    const review = await this.reviewRepository.insert({
      dateVisit,
      rating,
      description,
      restaurantId,
      authorId: userId,
    });

    return review.save();
  };

  getAllReviewFromAUser = async (userId: string): Promise<Review[]> => {
    return await this.reviewRepository.findManyBy({ authorId: userId });
  };

  getAllReviewFromARestaurant = async (
    restaurantId: string,
  ): Promise<Review[]> => {
    return await this.reviewRepository.findManyBy({ restaurantId });
  };

  getReviewById = async (reviewId: string): Promise<Review> => {
    return this.reviewRepository.findOneById(reviewId);
  };

  updateReview = async (
    reviewId: string,
    body: updateReviewDto,
    userId: string,
  ): Promise<Review> => {
    const review = await this.getReviewById(reviewId);

    if (review.authorId !== userId.toString()) {
      throw new UnauthorizedException();
    }
    // @ts-ignore
    await this.reviewRepository.updateOneBy({ _id: reviewId }, { ...body });

    return await this.getReviewById(reviewId);
  };

  deleteRestaurantById = async (reviewId: string, userId: string) => {
    const review = await this.getReviewById(reviewId);
    if (review.authorId !== userId.toString()) {
      throw new UnauthorizedException();
    }
    return await this.reviewRepository.deleteOnyBy({ _id: reviewId });
  };
}
