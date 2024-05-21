import { z } from 'zod';

export const orderSchemaValidation = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email(),
  productId: z.string({
    required_error: 'product id is required',
    invalid_type_error: 'product id must be a string',
  }),
  price: z.number().nonnegative().default(0),
  quantity: z.number().int().nonnegative().default(0),
});
