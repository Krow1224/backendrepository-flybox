import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/schemas/Product.schema';
import { User } from 'src/schemas/Users.schema';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: Product.name, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true, min: 0 },
      },
    ],
    default: [],
  })
  items: {
    product: Types.ObjectId;
    cantidad: number;
    subtotal: number;
  }[];

  @Prop({ type: Number, required: true, default: 0 })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

