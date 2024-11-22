"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
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
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
