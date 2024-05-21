import mongoose, { Schema } from 'mongoose';
import { Tinventory, Tproduct, Tvariants } from './product.interface';

const inventorySchema = new Schema<Tinventory>({
  quantity: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: false,
  },
});

const variantsSchema = new Schema<Tvariants>({
  type: String,
  value: String,
});

const productSchema = new Schema<Tproduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const Product = mongoose.model('product', productSchema);
