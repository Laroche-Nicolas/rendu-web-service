import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RestaurantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  foodType: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  averagePrice: string;
}
