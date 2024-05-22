import { Product } from '../product/product.model';
import { Torders } from './Order.interface';
import { Order } from './Order.model';

///---------------------create the order------------------------------------->
const createOrderIntoDb = async (orderData: Torders) => {
  const productInfo = await Product.findById({ _id: orderData.productId });
  const currentQuantity = productInfo?.inventory?.quantity as number;

  const data = currentQuantity - orderData.quantity;

  if (!productInfo) {
    return {
      success: false,
      message: 'Order not found',
    };
  }

  if (currentQuantity <= 0) {
    await Product.findByIdAndUpdate(
      { _id: orderData?.productId },
      { $set: { 'inventory.inStock': false } },
    );
  }

  if (currentQuantity < orderData.quantity) {
    return {
      success: false,
      message: 'Insufficient quantity available in inventory',
    };
  } else {
    await Product.findByIdAndUpdate(
      { _id: orderData?.productId },
      { $set: { 'inventory.quantity': data } },
    );

    const result = await Order.create(orderData);

    return result;
  }
};

const getOrder = async (email: string) => {
  if (email) {
    const result = await Order.findOne({ email });

    if (!result) {
      return {
        success: false,
        message: 'order not found',
      };
    }
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
