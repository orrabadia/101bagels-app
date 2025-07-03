import { loadStripe } from '@stripe/stripe-js';
import { Elements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import classes from './stripeButtons.module.css'

const stripePromise = loadStripe('pk_test_51RgG96PhxEodZc60wobKFkoUivsBqM0acxScCLdCnnDmAoB8IKDRRuGltzi7u9ZEqkHIAug7FP84XnBLvuO3lbTZ00zVJBd1zZ');

const StripeButtons = ({ order }) => {
  const handleClick = async () => {
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: order.items, orderId: order._id }),
    });

   
    const session = await res.json();
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
        console.log(result.error)
    }
  }

  return (
    <button onClick={handleClick} className={classes.button}>Pay Now with Stripe</button>
)};

export default StripeButtons;
