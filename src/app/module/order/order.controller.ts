import { Request, RequestHandler, Response } from 'express';
import { orderService } from './order.service';
import { Book } from '../product/book.model';



////// Create order 

const createOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;
  
    // Find the book by ID
    const book = await Book.findById(order.product);
    console.log(book);
  
    // If book is not found
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book product is not available',
      });
      return;
    }
  
    // Check inventory
    if (book.quantity < order.quantity) {
        res.status(400).json({
        success: false,
        message: 'Insufficient stock available.',
        stockAvailable: book.quantity
      });
      return;
    }
  
    // reduces the quantity of the book in stock by the quantity of the order:
    book.quantity = book.quantity - order.quantity;
    if (book.quantity === 0) {
      book.inStock = false;
    }
  
    await book.save();

    const result = await orderService.createOrderDB(order);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
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
}





/////// total revenue count for all ordered products 

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
