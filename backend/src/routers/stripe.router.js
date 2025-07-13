import {Router} from 'express';
import express from 'express';

import Stripe from 'stripe';
import { BAD_REQUEST } from '../constants/httpStatus.js';
const router = Router();

import { OrderModel } from '../models/order.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/create-checkout-session', async (req, res) => {
  const { items, orderId } = req.body;

  if (!Array.isArray(items)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid items array: ', items });
  }

  console.log('Creating Stripe session for orderId:', orderId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/success/${orderId}`,
    cancel_url: process.env.BASE_URL + '/cancel',
    metadata: { orderId }
  });

  res.json({ id: session.id });
});

export default router;