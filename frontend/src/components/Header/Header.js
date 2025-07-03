import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/useCart';
import classes from './header.module.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {

    const { user, logout } = useAuth();
    const {cart} = useCart();
    const [isJumping, setIsJumping] = useState(false);

    // Trigger jump animation when cart count changes
    useEffect(() => {
        if (cart.totalCount > 0) {
            setIsJumping(true);
            const timer = setTimeout(() => setIsJumping(false), 600);
            return () => clearTimeout(timer);
        }
    }, [cart.totalCount]);

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                101 Bagels and Subs
                </Link>
                <Link to="/menu" className={classes.logo}>
                Menu
                </Link>
                <nav>
                    <ul>
                        {
                            user ? (
                            <li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <a onClick={logout}>Logout</a>
                                </div>
                            </li> 
                            ) : (
                            <Link to="/login">Login</Link>
                        )}
                        <li>
                            <Link to="/cart">
                                <div className={classes.cart_flex_container}>
                                    Cart
                                    {cart.totalCount > 0 && (
                                        <span className={`${classes.cart_count} ${isJumping ? classes.jump : ''}`}>
                                            {cart.totalCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>

    )
}
