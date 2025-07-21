import { useEffect } from 'react';
import axios from 'axios';

export default function CancelPage() {
  useEffect(() => {
    axios.post('/api/orders/cancel-latest', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')).token : ''}` }
    });
  }, []);

  return (
    <div>
      <h2>Payment Cancelled</h2>
      <p>Your order has been cancelled. No payment was made.</p>
    </div>
  );
}