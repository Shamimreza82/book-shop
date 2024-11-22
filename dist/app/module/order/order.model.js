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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../product/book.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format.',
        },
    },
    product: {
        type: String,
        required: [true, 'Product ID is required.'],
        ref: 'Book',
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        // min: [1, 'Quantity must be at least 1.'],
        min: [0, 'Price must be a positive number.'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required.'],
        min: [0, 'Total price must be a positive value.'],
    },
}, { timestamps: true });
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        console.log(order.product);
        const book = yield book_model_1.Book.findById(order.product);
        console.log(book);
        if (!book) {
            throw new Error('Product not found.');
        }
        // Check inventory
        if (book.quantity < order.quantity) {
            throw new Error('Insufficient stock available.');
        }
        // Deduct quantity and update inStock
        book.quantity -= order.quantity;
        if (book.quantity === 0) {
            book.inStock = false;
        }
        yield book.save();
        next();
    });
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
