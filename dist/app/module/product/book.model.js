"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
        minlength: [1, 'Title must not be empty.'],
    },
    author: {
        type: String,
        required: [true, 'Author is required.'],
        trim: true,
        minlength: [1, 'Author name must not be empty.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number.'],
    },
    category: {
        type: String,
        enum: {
            values: ['fiction', 'science', 'selfDevelopment', 'poetry', 'religious'],
            message: 'Category must be one of: fiction, science, selfDevelopment, poetry, religious.',
        },
        required: [true, 'Category is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
        minlength: [1, 'Description must not be empty.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        min: [0, 'Quantity must be 0 or greater.'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In-stock status is required.'],
    },
}, { timestamps: true });
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
