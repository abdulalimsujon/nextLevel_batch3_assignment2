import { Schema, model } from 'mongoose';
import { Torders } from './Order.interface';

const orderSchema = new Schema<Torders>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

export const Order = model<Torders>('Order', orderSchema);
