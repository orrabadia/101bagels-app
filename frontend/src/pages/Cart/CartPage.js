import React from 'react';
import classes from './cartPage.module.css';
import { useCart } from '../../hooks/useCart';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {
  const { cart, updateItemQuantity, removeFromCartByIndex } = useCart();

  return (
    <>
      <Title title="Your Cart" margin="1.5rem 0 0 2.5rem" />
      {cart.items.length === 0? (<NotFound message='Cart Is Empty!' show ={true} showButton={true} />) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item, index) => (
              
                <li key={index}>
                  <div>
                    <img src={`/menu-items/${item.item.imageUrl}`} alt={item.item.name} />
                  </div>
                  <div>
                    <Link to={`/menu/item/${item.item.id}`}>{item.item.name}</Link>
                  </div>
                  <div>
                    <div>
                  <select
                        value={item.quantity}
                        onChange={e => updateItemQuantity(item, Number(e.target.value))}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                  </select>
                </div>
                  </div>
                  <div>
                    <Price price={item.price} locale={'en-US'} currency={'USD'}/>
                  </div>
                  <div>
                    <button className={classes.remove_button} onClick={() => removeFromCartByIndex(index)}>Remove</button>
                  </div>
                </li>
            ))}
          </ul>
          <div className={classes.checkout}>
            <div>
                <div className={classes.foods_count}>{cart.totalCount}</div>
                <div className={classes.total_price}>
                    <Price price={cart.totalPrice} locale={'en-US'} currency={'USD'}/></div>
            </div>
            <Link to="/checkout">Proceed To Checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}
