import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    console.log(order);
    const result = await orderService.createOrderDB(order);

    res.status(200).json({
      success: true,
      message: 'Order Create Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order Create Unsuccessfully',
      error,
    });
  }
};


export const orderController = {
    createOrder
}
