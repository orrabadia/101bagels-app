import React from 'react'
import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css'
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';

export default function Thumbnails({foods}) {
  return (
    <ul className={classes.list}>
        {
            foods.map(food => 
                <li key={food.id}>
                    <Link to={`/menu/item/${food.id}`}>
                        <img className={classes.image} 
                        src={`/menu-items/${food.imageUrl}`}
                        alt={food.name}
                        />
                    
                    <div className={classes.content}>
                        <div className={classes.name}>{food.name}</div>
                        <span className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
                            <img width="50px" src={"/icons/favorite-icon.png"} alt={"101 Favorite!"} />
                        </span>
                        <div className={classes.stars}>
                            <StarRating size={30} stars={food.stars} />
                        </div>
                        <div className={classes.product_item_footer}>
                            <div className={classes.price}>
                                <Price price={food.price} locale={'en-US'} currency={"USD"}/>
                            </div>
                            {food.desc && (
                            <div className={classes.description}>
                                {food.desc}
                            </div>
    )}
                        </div>
                    </div>
                    </Link>
                </li>

            )   
        }
    </ul>
  );
}
