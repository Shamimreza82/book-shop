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
          $project: {
              _id: 0,
              total: { $multiply: ["$quantity", "$totalPrice"] },
          },
  
      },
      { $group: { _id: "total", totalRevenue: { $sum: "$total" } } },
      {
          $project: {
              _id: 0,
              totalRevenue: 1
          }
      }
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
