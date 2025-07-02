import React from 'react'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'
import classes from './orderItems.module.css'
 

export default function OrderItems({ order, linkToItem = true }, ) {
return (
    <table className={classes.table}>
        <tbody>
        <tr>
            <td colSpan="5">
            <h3>Order Items:</h3>
            </td>
        </tr>
        {order.items.map((item) => (
            <tr key={item.itemId}>
                <td>
                {linkToItem ? (
                <Link to={`/menu/item/${item.itemId}`}>
                    <img src={item.imageUrl} alt={item.name} />
                </Link>
              ) : (
                <img src={item.imageUrl} alt={item.name} />
              )}
                </td>
                <td>{item.name}</td>
                <td>
                    <Price price={item.price} />
                </td>
                <td>{item.quantity}</td>
                <td>
                    <Price price={item.price * item.quantity} />
                </td>
            </tr>
        ))}

        <tr>
            <td colSpan="3"></td>
            <td>
                <strong>Total :</strong>
            </td>
            <td>
                <Price price={order.totalPrice} locale={'en-US'} currency={'USD'} />
            </td>
        </tr>
        </tbody>
    </table>
  );
}
