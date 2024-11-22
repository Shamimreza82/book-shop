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
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const book = yield book_model_1.Book.findById(order.product);
        console.log(book);
        if (!book) {
            res.status(500).json({
                success: false,
                message: 'Book product is not available',
            });
        }
        // Check inventory
        if (book.quantity < order.quantity) {
            res.status(500).json({
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
        const result = yield order_service_1.orderService.createOrderDB(order);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order Create Successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order Create Unsuccessfully',
            error,
            stack: error instanceof Error ? error.stack : undefined,
        });
    }
});
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
