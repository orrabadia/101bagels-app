import React, { useEffect, useState } from 'react';
import { getLatestOrderForCurrentUser, getOrderById } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import OrderItems from '../../components/OrderItems/OrderItems';
import Title from '../../components/Title/Title';
import { useParams } from 'react-router-dom';
import classes from './successPage.module.css'

export default function SuccessPage() {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();

    if (!orderId) {
      setError('No order ID provided.');
      setLoading(false);
      return;
    }

    getOrderById(orderId)
      .then(data => {
        console.log('Order data received:', data);
        console.log('PaymentId:', data.paymentId);
        console.log('Order status:', data.status);
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not fetch your order. Please check your email or contact support.');
        setLoading(false);
      });
  }, [orderId, clearCart]);

  if (loading) return <div>Loading your order...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>No recent order found.</div>;

  return (
    <div className={classes.container}>
      <Title title="Thank you for your order!" fontSize="2rem" />
      <p>Your payment was successful.</p>
      <p>We'll send you order updates. Standard message rates may apply.</p>
      
      
      { order && (<div className={classes.metadata}>
        Payment ID: {order.paymentId || 'N/A'}<br />
        Status: {order.status}<br />
        Created: {new Date(order.createdAt).toLocaleString()}
      </div> )}
     
      <OrderItems order={order} linkToItem={false} />
      <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>
        Total Paid: ${order.totalPrice}
      </div>
    </div>
  );
}