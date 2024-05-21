/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './Order.service';
import { Torders } from './Order.interface';
import { orderSchemaValidation } from './zod.validation';

const createOrders = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const parseData = orderSchemaValidation.parse(order);

    const result = await orderService.createOrderIntoDb(parseData as Torders);

    res.status(200).json({
      success: true,
      message: 'Orders created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
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

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result,
    });
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
