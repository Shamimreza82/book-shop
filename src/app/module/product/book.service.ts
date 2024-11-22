import { IBook } from './book.interface';
import { Book } from './book.model';

const createBookBD = async (book: IBook) => {
  const result = Book.create(book);
  return result;
};

const getAllBooksDB = async (searchTerm: string) => {
  const result = Book.find({
    $or: [
      { category: { $regex: searchTerm, $options: 'i' } }, 
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
    ],
  });
  return result;
};

const getSingleBooksDB = async (id: string) => {
  const result = Book.findById(id);
  return result;
};

const updateBookDB = async (id: string, data: IBook) => {
  const result = Book.findByIdAndUpdate(
    id,
    {
      $set: {
        title: data.title,
        author: data.author,
        price: data.price,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        inStock: data.inStock,
      },
    },
    { new: true, timestamps: true }
  );
  return result;
};

const deleteBookDB = async (id: string) => {
  const result = Book.findByIdAndDelete(id);
  return result;
};

export const bookService = {
  createBookBD,
  getAllBooksDB,
  getSingleBooksDB,
  updateBookDB,
  deleteBookDB,
};
