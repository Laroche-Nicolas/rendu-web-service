import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { reviewDto, updateReviewDto } from '../dto/review.dto';
import { Review } from '../models/review.model';
import { JWTGuard } from '../guards/jwt.guard';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/me')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for get all reviews from the current user',
    description:
      'Route for get all reviews from the current user, and return an Array of Review.',
  })
  getAllReviewFromAUser(@Req() req: any): Promise<Review[]> {
    return this.reviewService.getAllReviewFromAUser(req.user._id);
  }

  @Get('/restaurant/:restaurantId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for get all the reviews from a restaurant',
    description:
      'Route for get all the reviews from a restaurant and return an Array of Review.',
  })
  getAllReviewFromARestaurant(
    @Param('restaurantId') restaurantId: string,
  ): Promise<Review[]> {
    return this.reviewService.getAllReviewFromARestaurant(restaurantId);
  }

  @Get(':reviewId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for get a review',
    description: 'Route for get a review informations depending on his id.',
  })
  getARestaurantByID(@Param('reviewId') reviewId: string): Promise<Review> {
    return this.reviewService.getReviewById(reviewId);
  }

  @Post()
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for adding a review',
    description: 'Route to register a review and return the review.',
  })
  createReview(
    @Body() parameters: reviewDto,
    @Req() req: any,
  ): Promise<Review> {
    return this.reviewService.addReview(parameters, req.user._id);
  }

  @Put(':reviewId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route to update a review',
    description:
      'Route for update all the fields of a review depending on his id.',
  })
  updateReviewById(
    @Param('reviewId') reviewId: string,
    @Body() body: updateReviewDto,
    @Req() req: any,
  ): Promise<Review> {
    return this.reviewService.updateReview(reviewId, body, req.user._id);
  }

  @Delete(':reviewId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route to delete a review',
    description: 'Route for delete a review depending on his id.',
  })
  deleteRestaurantById(@Param('reviewId') reviewId: string, @Req() req: any) {
    return this.reviewService.deleteRestaurantById(reviewId, req.user._id);
  }
}
