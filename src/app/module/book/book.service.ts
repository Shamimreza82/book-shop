import { IBook } from "./book.interface";
import { Book } from "./book.model";


const createBookBD = async (book: IBook) => {
    const result = Book.create(book)
    return result
}



export const bookService = {
    createBookBD,
}