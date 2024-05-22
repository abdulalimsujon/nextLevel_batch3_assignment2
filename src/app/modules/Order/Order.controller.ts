/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './Order.service';
import { Torders } from './Order.interface';
import { orderSchemaValidation } from './zod.validation';

type OrderResult = {
  success: boolean;
  message: string;
};

function isOrderResult(obj: any): obj is OrderResult {
  return (
    typeof obj === 'object' &&
    'success' in obj &&
    typeof obj.success === 'boolean' &&
    'message' in obj &&
    typeof obj.message === 'string'
  );
}

const createOrders = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const parseData = orderSchemaValidation.parse(order);

    const result = await orderService.createOrderIntoDb(parseData as Torders);

    if (isOrderResult(result)) {
      res.status(200).json({
        success: result.success,
        message: result.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders created successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Orders created failed',
      data: error.message || 'something went wrong',
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await orderService.getOrder(email as string);

    if (isOrderResult(result)) {
      res.status(200).json({
        success: result.success,
        message: result.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: 'Orders fetched failed',
      data: error.message || 'something went wrong',
    });
  }
};

export const orderController = {
  createOrders,
  getOrders,
};
