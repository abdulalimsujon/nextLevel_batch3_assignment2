import { Torders } from './Order.interface';
import { Order } from './Order.model';

const createOrderIntoDb = async (orderData: Torders) => {
  const result = await Order.create(orderData);

  return result;
};

const getOrder = async (email: string) => {
  if (email) {
    const result = await Order.findOne({ email });
    return result;
  } else {
    const result = await Order.find({});

    return result;
  }
};

export const orderService = {
  createOrderIntoDb,

  getOrder,
};
