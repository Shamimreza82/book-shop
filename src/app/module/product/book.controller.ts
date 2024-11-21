import { Request, Response } from 'express';
import { bookService } from './book.service';

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await bookService.createBookBD(book);

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Book created Unsuccessfully, Something went wrong ',
      error,
    });
  }
};


const getSingleBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await bookService.getSingleBooksDB(productId);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Book retrieved Unsuccessfully, Something went wrong ',
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body
    console.log(productId, data);
    const result = await bookService.updateBookDB(productId, data);

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Book updated Unsuccessfully, Something went wrong ',
      error,
    });
  }
};


export const bookController = {
    createBook, 
    getSingleBook,
    updateBook
}