import React, { useEffect, useState} from 'react'
import { useCart } from '../../hooks/useCart';
import classes from './itemPage.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { getByID } from '../../services/foodService';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';

export default function ItemPage() {
    const [item, setItem] = useState({});
    const {id} = useParams();
    const {addToCart} = useCart();
    const navigate = useNavigate()

    const handleAddToCart = () => {
      addToCart(item);
      navigate('/cart');
    }

    useEffect(() => {
        getByID(id).then(setItem)}, [id]);
  return (
    <>
    { item && <div className={classes.container}>
        <img className={classes.image} src={`/menu-items/${item.imageUrl}`} alt={item.name}/>
        <div className={classes.details}>
            <div className={classes.header}>
                <span className={classes.name}>{item.name}</span>
                <span className={`${classes.favorite} ${item.favorite? '': classes.not}`}>
                    <img width="50px" src={"/icons/favorite-icon.png"} alt="101 Favorite!" />
                </span>
            </div>
            <div className={classes.description}>
                {item.desc}
            </div>
            <div className={classes.rating}>
                <StarRating stars={item.stars} size={25} />
            </div>
            <div className={classes.tags}>
              {item.tags && (
                <Tags
                  tags={item.tags.map(tag => ({ name: tag }))}
                  forItemPage={true}
                />
              )}
            </div>
            <div className={classes.price}>
                <Price price={item.price} locale={'en-US'} currency={"USD"} />
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
        
        </div>}
    </>
  )
}
