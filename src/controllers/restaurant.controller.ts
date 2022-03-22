import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../services/restaurant.service';
import { addRestaurantDto } from '../dto/add-restaurant.dto';
import { Restaurant } from '../models/restaurant.model';
import { JWTGuard } from '../guards/jwt.guard';
import { RestaurantDto } from '../dto/restaurant.dto';

@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('add')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for adding an restaurant',
    description: 'Route to register an user and return the user.',
  })
  createRestaurant(@Body() parameters: addRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.addRestaurant(parameters);
  }

  @Get()
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for get all restaurants',
    description: 'Route for get all restaurants.',
  })
  getAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':restaurantId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route for get a restaurant',
    description: 'Route for get a restaurant depending on his id.',
  })
  getARestaurantByID(
    @Param('restaurantId') restaurantId: string,
  ): Promise<Restaurant> {
    return this.restaurantService.getRestaurantByID(restaurantId);
  }

  @Delete(':restaurantId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route to delete a restaurant',
    description: 'Route for delete a restaurant depending on his id.',
  })
  deleteRestaurantById(@Param('restaurantId') restaurantId: string) {
    return this.restaurantService.deleteRestaurantById(restaurantId);
  }

  @Put(':restaurantId')
  @UseGuards(JWTGuard)
  @ApiSecurity('Bearer')
  @ApiOperation({
    summary: 'Route to update a restaurant',
    description:
      'Route for update all the fields of a restaurant depending on his id.',
  })
  updateRestaurantById(
    @Body() body: RestaurantDto,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.restaurantService.updateRestaurantById(restaurantId, body);
  }
}
