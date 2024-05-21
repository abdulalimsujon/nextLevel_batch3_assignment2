/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { productService } from './product.service';
import productZodValidation from './zodValidationSchema';
import { Tproduct } from './product.interface';

const createProductIntoDb = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const parseData = productZodValidation.parse(product);

    const result = await productService.createProduct(parseData as Tproduct);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Product created failed',
      error: error || 'something went wrong',
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProduct();

    console.log('sdghh', result);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Product fetched failed',
      error: error || 'something went wrong',
    });
  }
};

export const productController = {
  createProductIntoDb,
  getAllProduct,
};
