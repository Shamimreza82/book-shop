import { Request, RequestHandler, Response } from 'express';
import { orderService } from './order.service';
import { Book } from '../product/book.model';
import { Order } from './order.model';
// import { Order } from './order.model';

////// Create order
const createOrder: RequestHandler = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const orderBD = await Order.findOne({ email: orderData.email });
    if (orderBD && orderData.email === orderBD.email) {
      res.status(404).json({
        success: false,
        message: 'email already exist',
      });
      return;
    }

    const book = await Book.findById(orderData.product);

    // If book is not found
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book product is not available',
      });
      return;
    }

    // Check inventory
    if (book.quantity < orderData.quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available.',
        stockAvailable: book.quantity,
      });
      return;
    }

    // reduces the quantity of the book in stock by the quantity of the order:
    book.quantity = book.quantity - orderData.quantity;

    if (book.quantity === 0) {
      book.inStock = false;
    }

    await book.save();

    const result = await orderService.createOrderDB(orderData);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order creation failed',
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};




/////// total revenue count for all ordered products
const totalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.totalRevenueDB();
    if (!result) {
      res.status(200).json({
        success: false,
        message: 'Order is empty',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Revenue calculated Unsuccessfully',
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};

export const orderController = {
  createOrder,
  totalRevenue,
};
