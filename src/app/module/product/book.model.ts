import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";



const bookSchema = new Schema<IBook>({
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





export const Book  = model<IBook>('Book', bookSchema) 
