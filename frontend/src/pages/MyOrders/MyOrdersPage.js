import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import classes from './myOrdersPage.module.css'
import { findOrderById } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import DateTime from '../../components/DateTime/DateTime';
import OrderItems from '../../components/OrderItems/OrderItems';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';

export default function MyOrdersPage() {

    const { orderId } = useParams();
    const [order, setOrder] = useState();
    useEffect(() => {
        orderId && findOrderById(orderId).then(order => {
            setOrder(order)
        })
    }, []);

    if (!orderId) {
        return <NotFound message='Order Not Found' linkText='Go To Home Page' linkRoute='/' show={true} showButton={true}/>
    }


    return (
        order && (<div className={classes.container}>
            <div className={classes.content}>
                <Title title={`Order ID: ${order.id}`} fontSize={"2rem"} />
                <div className={classes.header}>
                    <div>
                        <strong>Date: </strong>
                        <DateTime date={order.createdAt} />
                    </div>
                    <div>
                        <strong>Name: </strong>
                        {order.name}
                    </div>
                    <div>
                        <strong>Status: </strong>
                        {order.status}
                    </div>
                    {order.paymentId && (<div>
                        <strong>Payment Id: </strong>
                        {order.paymentId}
                    </div>)}
                    <OrderItems order={order} />

                </div>

                {/* Work on Later*/}
                <button>Order Again</button>
            </div>
        </div>
    )
)}
