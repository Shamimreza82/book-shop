import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const orderSchema = new Schema<IOrder>({
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
  { timestamps: true });


  

export const Order = model<IOrder>('Order', orderSchema)