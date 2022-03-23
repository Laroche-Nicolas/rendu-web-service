import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class reviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateVisit: Date;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  restaurantId: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class updateReviewDto extends OmitType(reviewDto, [
  'restaurantId',
] as const) {}
