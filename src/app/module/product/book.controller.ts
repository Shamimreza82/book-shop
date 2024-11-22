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
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
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
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
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
      message: 'Book updated Unsuccessfully, Something went wrong',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};


const deleteBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await bookService.deleteBookDB(productId);

    res.status(200).json({
      success: true,
      message: 'Books Deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Book deleted Unsuccessfully, Something went wrong ',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};


const getAllBooks = async (req: Request, res: Response) => {
  try {
    // const { searchTerm } = req.query;
    const searchTerm: string = (req.query.searchTerm as string) || '';

    const result = await bookService.getAllBooksDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Books retrieved Unsuccessfully',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};





export const bookController = {
    createBook, 
    getSingleBook,
    updateBook,
    deleteBook,
    getAllBooks
}