import { IOrder } from './order.interface';
import { Order } from './order.model';



const createOrderDB = async (order: IOrder) => {
  try {
    const result = await Order.create(order);
    return result;
  } catch (error) {
    // console.log(error);
  }
};


export const orderService = {
  createOrderDB,
};
