import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  zipcode: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  foodType: string;

  @Prop()
  averagePrice: string;

  @Prop()
  userId: string;

  @Prop({ select: false })
  __v: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
