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
exports.bookController = void 0;
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield book_service_1.bookService.createBookBD(book);
        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
            success: false,
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield book_service_1.bookService.getSingleBooksDB(productId);
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book retrieved Unsuccessfully, Something went wrong ',
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const data = req.body;
        console.log(productId, data);
        const result = yield book_service_1.bookService.updateBookDB(productId, data);
        res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book updated Unsuccessfully, Something went wrong',
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield book_service_1.bookService.deleteBookDB(productId);
        res.status(200).json({
            success: true,
            message: 'Books Deleted successfully',
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book deleted Unsuccessfully, Something went wrong ',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { searchTerm } = req.query;
        const searchTerm = req.query.searchTerm || '';
        const result = yield book_service_1.bookService.getAllBooksDB(searchTerm);
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Books retrieved Unsuccessfully',
            success: false,
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
exports.bookController = {
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
    getAllBooks
};
