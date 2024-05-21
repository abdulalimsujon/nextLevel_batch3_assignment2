import { Torders } from './Order.interface';
import { Order } from './Order.model';

const createOrderIntoDb = async (orderData: Torders) => {
  const result = await Order.create(orderData);

  return result;
};

export const orderService = {
  createOrderIntoDb,
};
