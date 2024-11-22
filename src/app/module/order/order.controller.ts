import { Request, Response } from 'express';
import { orderService } from './order.service';



const createOrder = async (req: Request, res: Response) => {
  try {
    // const { email, product: productId, quantity } = req.body;
    const order = req.body

    // const product = await Order.create(order)
    // console.log(product);



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
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};


const totalRevenue = async (req: Request, res: Response) => {
  try {
  
    const result = await orderService.totalRevenueDB();

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Revenue calculated Unsuccessfully',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};


export const orderController = {
    createOrder,
    totalRevenue
}
