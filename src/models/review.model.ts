import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  _id: Types.ObjectId;

  @Prop({ required: true })
  dateVisit: Date;

  @Prop({ required: true })
  rating: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ select: false })
  __v: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
