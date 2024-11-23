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
const order_model_1 = require("./order.model");
// import { Order } from './order.model';
////// Create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const orderBD = yield order_model_1.Order.findOne({ email: orderData.email });
        if (orderBD && orderData.email === orderBD.email) {
            res.status(404).json({
                success: false,
                message: 'email already exist',
            });
            return;
        }
        const book = yield book_model_1.Book.findById(orderData.product);
        // If book is not found
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book product is not available',
            });
            return;
        }
        // Check inventory
        if (book.quantity < orderData.quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient stock available.',
                stockAvailable: book.quantity,
            });
            return;
        }
        // reduces the quantity of the book in stock by the quantity of the order:
        book.quantity = book.quantity - orderData.quantity;
        if (book.quantity === 0) {
            book.inStock = false;
        }
        yield book.save();
        const result = yield order_service_1.orderService.createOrderDB(orderData);
        res.status(200).json({
            message: 'Order created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
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
        if (!result) {
            res.status(200).json({
                success: false,
                message: 'Order is empty',
                data: result,
            });
        }
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
