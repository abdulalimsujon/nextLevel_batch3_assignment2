import { Tproduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (productData: Tproduct) => {
  const result = await Product.create(productData);

  return result;
};

const getAllProduct = async () => {
  const result = await Product.find({});

  console.log('result', result);

  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
};
