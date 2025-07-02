import { model, Schema } from 'mongoose';
import { OrderStatus } from '../constants/orderStatus.js';

// Flattened item schema: name, price, quantity only
export const OrderItemSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: 'item' },
    name: { type: String, required: true },      // Item name
    price: { type: Number, required: true },     // Unit price (not total)
    quantity: { type: Number, required: true },  // Quantity ordered
    imageUrl: { type: String },
}, {
  _id: false,
});

// Main Order schema
const orderSchema = new Schema({
    name: { type: String, required: true },                    // Customer name
    paymentId: { type: String },                               // Optional Stripe/payment ID
    totalPrice: { type: Number, required: true },              // Total for entire order
    items: { type: [OrderItemSchema], required: true },        // List of purchased items
    status: { type: String, default: OrderStatus.NEW },        // Order status
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Linked user
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


export const OrderModel = model('order', orderSchema);
