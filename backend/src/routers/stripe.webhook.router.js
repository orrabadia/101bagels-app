// routers/stripe.webhook.router.js
import { Router } from 'express';
import express from 'express';
import Stripe from 'stripe';
import { OrderModel } from '../models/order.model.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Test endpoint to verify webhook is accessible
router.get('/test', (req, res) => {
  res.json({ message: 'Webhook endpoint is working', timestamp: new Date().toISOString() });
});

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('Webhook received at:', new Date().toISOString());
  console.log('Headers:', req.headers);
  
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('Webhook event received:', event.type);
    console.log('Event data:', JSON.stringify(event.data, null, 2));
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    console.error('Webhook secret used:', process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not set');
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentId = session.payment_intent;
    const orderId = session.metadata?.orderId;

    console.log('Processing checkout.session.completed:');
    console.log('- Payment Intent:', paymentId);
    console.log('- Order ID:', orderId);
    console.log('- Session metadata:', session.metadata);
    console.log('- Full session object:', JSON.stringify(session, null, 2));

    if (!orderId) {
      console.error('No orderId found in session metadata');
      return res.status(400).send('No orderId in metadata');
    }

    try {
      const updateResult = await OrderModel.findByIdAndUpdate(
        orderId,
        { paymentId, status: 'PAYED' },
        { new: true } 
      );
      
      if (!updateResult) {
        console.error(`No order found with ID ${orderId}`);
      } else {
        console.log('Order updated successfully:', {
          orderId: updateResult._id,
          paymentId: updateResult.paymentId,
          status: updateResult.status
        });
      }
    } catch (err) {
      console.error('Database update failed:', err);
    }
  } else {
    console.log('Ignoring event type:', event.type);
  }

  res.json({ received: true });
});

export default router;
