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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const book_model_1 = require("../product/book.model");
////// Create order 
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        // Find the book by ID
        const book = yield book_model_1.Book.findById(order.product);
        console.log(book);
        // If book is not found
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book product is not available',
            });
        }
        // Check inventory
        if (book.quantity < order.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock available.',
            });
        }
        // Deduct quantity and update inStock
        book.quantity -= order.quantity;
        if (book.quantity === 0) {
            book.inStock = false;
        }
        yield book.save();
        // Create the order
        const result = yield order_service_1.orderService.createOrderDB(order);
        // Send success response
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        // Catch and handle any errors
        return res.status(500).json({
            success: false,
            message: 'Order creation failed',
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
/////// total revenue count for all ordered products 
const totalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.totalRevenueDB();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Revenue calculated Unsuccessfully',
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
exports.orderController = {
    createOrder,
    totalRevenue,
};
