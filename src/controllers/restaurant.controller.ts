import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../services/restaurant.service';
import { addRestaurantDto } from '../dto/add-restaurant.dto';
import { Restaurant } from '../models/restaurant.model';

@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Put('add')
  @ApiOperation({
    summary: 'Route for adding an restaurant',
    description: 'Route to register an user and return the user.',
  })
  registerUser(@Body() parameters: addRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.addRestaurant(parameters);
  }
}
