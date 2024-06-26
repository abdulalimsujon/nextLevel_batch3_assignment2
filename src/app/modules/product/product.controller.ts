/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { productService } from './product.service';

import { Tproduct } from './product.interface';
import { productZodValidation } from './zodValidationSchema';

/// -----------------create the product---------------------------->

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

// --------------------get all product or get inSearchTerm --------------->
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const text = req.query.searchTerm;

    const result = await productService.getAllProduct(text as string);

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

/// -------------------search with id----------------------------------->
const searchByid = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.searchById(productId);
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

//----------------------delete with id------------------------------------>
const deleteByid = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteById(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Product delete failed',
      error: error || 'something went wrong',
    });
  }
};

///--------------------update with id partailly or entirely--------------->

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const payload = req.body;
    const result = await productService.updateProduct(productId, payload);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Product updated failed',
      error: error || 'something went wrong',
    });
  }
};

export const productController = {
  createProductIntoDb,
  getAllProduct,
  searchByid,
  deleteByid,
  updateProduct,
};
