import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderDB = async (order: IOrder) => {
    const result = await Order.create(order);
    return result;
};

const totalRevenueDB = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: { _id: 'totalPrice', totalRevinew: { $sum: '$totalPrice' } },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: '$totalRevinew',
        },
      },
    ]);

    return result[0];
  } catch (error) {
    console.log(error);
  }
};

export const orderService = {
  createOrderDB,
  totalRevenueDB
};
