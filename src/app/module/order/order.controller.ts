import { Request, Response } from 'express';
import { orderService } from './order.service';
import { Book } from '../product/book.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const book = await Book.findById(order.product);
    console.log(book);
    if (!book) {
      res.status(500).json({
        success: false,
        message: 'Book product is not available',
      });
    }

    // Check inventory
    if (book.quantity < order.quantity) {
      res.status(500).json({
        success: false,
        message: 'Insufficient stock available.',
      });
    }

    // Deduct quantity and update inStock
    book.quantity -= order.quantity;
    if (book.quantity === 0) {
      book.inStock = false;
    }

    await book.save();

    const result = await orderService.createOrderDB(order);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order Create Successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order Create Unsuccessfully',
      error,
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
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};

export const orderController = {
  createOrder,
  totalRevenue,
};
