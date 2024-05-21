import { z } from 'zod';

// Zod schema for Tinventory
const inventorySchema = z.object({
  quantity: z.number().default(0),
  inStock: z.boolean().default(false),
});
const variantsSchema = z.object({
  type: z.string(),
  value: z.string(),
});
// Zod schema for Tproduct
const productZodValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),

  price: z.number(),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category  must be string',
  }),
  tags: z.array(z.string()).optional(),
  variants: z.array(variantsSchema),
  inventory: inventorySchema,
});

export default productZodValidation;
