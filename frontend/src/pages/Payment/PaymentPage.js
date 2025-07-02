import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService.js';
import Title from '../../components/Title/Title';
import OrderItems from '../../components/OrderItems/OrderItems.js';
import StripeButtons from '../../components/StripeButtons/StripeButtons';

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            {/* <div>
              <h3>Phone Number</h3>
              <span>{order.phone}</span>
            </div> */}
          </div>
          <OrderItems order={order} linkToItem={false} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <StripeButtons order={order}/>
          </div>
        </div>
      </div>
    </>
  );
}