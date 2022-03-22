import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { addRestaurantDto } from '../dto/add-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  addRestaurant = async (parameters: addRestaurantDto): Promise<Restaurant> => {
    const { name, foodType, address, zipcode } = parameters;

    const restaurant = await this.restaurantRepository.insert({
      name,
      foodType,
      address,
      zipcode,
    });

    return restaurant.save();
  };
}
