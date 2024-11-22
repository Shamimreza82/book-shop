"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/products/:productId', book_controller_1.bookController.getSingleBook);
router.post('/create-product', book_controller_1.bookController.createBook);
router.put('/products/:productId', book_controller_1.bookController.updateBook);
router.delete('/products/:productId', book_controller_1.bookController.deleteBook);
router.get('/products', book_controller_1.bookController.getAllBooks);
exports.bookRouter = router;
