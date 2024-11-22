import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { Book } from '../product/book.model';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
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
  },
  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  const order = this;
  console.log(order.product);

  const book = await Book.findById(order.product);
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

  await book.save();
  next();
});

export const Order = model<IOrder>('Order', orderSchema);
