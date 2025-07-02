import React, { useState } from 'react'
import classes from './checkoutPage.module.css'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { createOrder } from '../../services/orderService'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import Title from '../../components/Title/Title'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import OrderItems from '../../components/OrderItems/OrderItems'

export default function CheckoutPage() {

    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // const [order, setOrder] = useState({...cart});
    const [order, setOrder] = useState({
        ...cart,
        items: cart.items.map(({ item, quantity }) => ({
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity,
          imageUrl: item.imageUrl,
        })),
      });

    const {register, formState: { errors }, handleSubmit, } = useForm();

    const submit = async data => {
        // const formattedItems = order.items.map(({ item, quantity }) => ({
        //     name: item.name,
        //     price: item.price,
        //     quantity,
        //     itemId: item.id,
        //     imageUrl: item.imageUrl,
        // }));

        const formattedItems = order.items;

        await createOrder({
            name: data.name,
            items: formattedItems,
            totalPrice: order.totalPrice,
            totalCount: order.totalCount,
        });
        navigate('/payment');
    }


  return (
    <>
    <form onSubmit={handleSubmit(submit)} className={classes.container}>
    <div className={classes.content}>
        <Title title="Order Form" fontSize="1.6rem" />
        <div className={classes.inputs}>
            <Input
                defaultValue={user.name}
                label="Name"
                {...register('name')}
                error={errors.name}
            />

            {/* Need to add Phone Number */}

            <Input
                // defaultValue={user.name}
                label="Phone Number"
                {...register('number')}
                error={errors.number}
            />
        </div>
        <OrderItems order={order} linkToItem={true} />
    </div>

    <div className={classes.button_container}>
        <Button
            type="submit"
            text="Proceed To Payment"
            width="100%"
            height="3rem"
        />
    </div>

    </form>
    </>
  )
}
