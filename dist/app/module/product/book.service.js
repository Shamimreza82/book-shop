"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const book_model_1 = require("./book.model");
const createBookBD = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.create(book);
    return result;
});
const getAllBooksDB = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.create(book);
    return result;
});
const getSingleBooksDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.findById(id);
    return result;
});
const updateBookDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.findByIdAndUpdate(id, { $set: {
            title: data.title,
            author: data.author,
            price: data.price,
            category: data.category,
            description: data.description,
            quantity: data.quantity,
            inStock: data.inStock,
        } }, { new: true });
    return result;
});
const deleteBookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.bookService = {
    createBookBD,
    getAllBooksDB,
    getSingleBooksDB,
    updateBookDB,
    deleteBookDB
};
