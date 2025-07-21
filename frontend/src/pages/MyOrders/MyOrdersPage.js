import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import classes from './myOrdersPage.module.css'
import { findOrderById, getAllOrders, createOrder } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import DateTime from '../../components/DateTime/DateTime';
import OrderItems from '../../components/OrderItems/OrderItems';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { useCart } from '../../hooks/useCart';

export default function MyOrdersPage() {

    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    useEffect(() => {
        if (orderId) {
            findOrderById(orderId).then(order => {
                setOrder(order);
                setLoading(false);
            });
        } else {
            getAllOrders().then(orders => {
                setOrders(orders);
                setLoading(false);
            });
        }
    }, [orderId]);

    const handleOrderAgain = (order) => {
        order.items.forEach(item => {
            addToCart({
                ...item,
                _id: item.itemId || item._id,
            });
        });
        navigate('/cart');
    };

    if (!orderId) {
        /* Render all orders */
        return (
            <div className={classes.all_orders_container}>
                <Title title="My Orders" fontSize="2rem" />
                {orders.length === 0 ? (
                    <div>No orders found.</div>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className={classes.order_card}>
                            <div className={classes.header_container}>
                                <div>
                                    <div>
                                        <Link to={`/my-orders/${order._id}`}>
                                        <strong>Order ID:</strong> {order._id}
                                        </Link>
                                    </div>
                                    <div>
                                        <strong>Date:</strong> <DateTime date={order.createdAt} />
                                    </div>
                                    <div>
                                        <strong>Status:</strong> {order.status}
                                        {order.status === 'NEW' && (
                                            <span style={{ color: 'orange', marginLeft: 8 }}>(Pay in Store)</span>
                                        )}
                                        {order.status === 'PAYED' && (
                                            <span style={{ color: 'green', marginLeft: 8 }}>(Paid Online)</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Button fontSize="1rem" width="5rem" text="Order Again" onClick={() => handleOrderAgain(order)} />
                                </div>
                            </div>
                            <div className={classes.order_items}>
                                <OrderItems order={order} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    }
    
    if (!order) {
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
                <Button text="Order Again" onClick={() => handleOrderAgain(order)} />
            </div>
        </div>
    )
)}
