import { Tproduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (productData: Tproduct) => {
  const result = await Product.create(productData);

  return result;
};

const getAllProduct = async (searchTerm: string) => {
  if (searchTerm) {
    const searchQuery = await Product.find(
      {
        $or: ['name', 'description', 'category'].map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      },
      { _id: 0 },
    );

    return searchQuery;
  } else {
    const result = await Product.find({}, { _id: 0 });

    return result;
  }
};

const searchById = async (id: string) => {
  const result = await Product.findById({ _id: id }, { _id: 0 });

  return result;
};
const deleteById = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

const updateProduct = async (id: string, payload: Partial<Tproduct>) => {
  const { variants, inventory, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (variants && Object.keys(variants).length) {
    for (const [key, value] of Object.entries(variants)) {
      modifiedUpdatedData[`variants.${key}`] = value;
    }
  }
  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      modifiedUpdatedData[`inventory.${key}`] = value;
    }
  }
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  searchById,
  deleteById,

  updateProduct,
};
