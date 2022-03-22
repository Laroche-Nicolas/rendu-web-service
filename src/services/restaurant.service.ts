import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { addRestaurantDto } from '../dto/add-restaurant.dto';
import { RestaurantDto } from '../dto/restaurant.dto';

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

  getAllRestaurants = async (): Promise<Restaurant[]> => {
    return this.restaurantRepository.findAll();
  };

  getRestaurantByID = async (restaurantId: string): Promise<Restaurant> => {
    return this.restaurantRepository.findOneById(restaurantId);
  };

  deleteRestaurantById = async (restaurantId: string) => {
    return await this.restaurantRepository.deleteOnyBy({ _id: restaurantId });
  };

  updateRestaurantById = async (
    restaurantId: string,
    parameters: RestaurantDto,
  ) => {
    await this.restaurantRepository.updateOneBy(
      { _id: restaurantId },
      { ...parameters },
    );
  };
}
