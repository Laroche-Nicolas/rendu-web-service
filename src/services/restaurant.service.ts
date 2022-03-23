import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { RestaurantDto } from '../dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  addRestaurant = async (
    parameters: RestaurantDto,
    userId: string,
  ): Promise<Restaurant> => {
    const restaurant = await this.restaurantRepository.insert({
      ...parameters,
      userId,
    });

    return restaurant.save();
  };

  getAllRestaurants = async (): Promise<Restaurant[]> => {
    return this.restaurantRepository.findAll();
  };

  getRestaurantByID = async (restaurantId: string): Promise<Restaurant> => {
    return this.restaurantRepository.findOneById(restaurantId);
  };

  updateRestaurantById = async (
    restaurantId: string,
    parameters: RestaurantDto,
    userId: string,
  ): Promise<Restaurant> => {
    const restaurant = await this.getRestaurantByID(restaurantId);
    if (restaurant.userId !== userId.toString()) {
      throw new UnauthorizedException();
    }
    await this.restaurantRepository.updateOneBy(
      { _id: restaurantId },
      { ...parameters },
    );
    return await this.getRestaurantByID(restaurantId);
  };

  deleteRestaurantById = async (restaurantId: string, userId: string) => {
    const restaurant = await this.getRestaurantByID(restaurantId);
    if (restaurant.userId !== userId.toString()) {
      throw new UnauthorizedException();
    }
    return await this.restaurantRepository.deleteOnyBy({ _id: restaurantId });
  };
}
