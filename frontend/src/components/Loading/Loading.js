import React from 'react'
import classes from './loading.module.css'
import { useLoading } from '../../hooks/useLoading'

export default function Loading() {

    const { isLoading } = useLoading();
    if (!isLoading) return;


  return (
    <div className={classes.container}>
        <div className={classes.items}>
            <div className={classes.spinningBagel}>
                <img src="/icons/loading-icon.svg" alt="Loading" />
            </div>
        </div>
    </div>
  )
}
