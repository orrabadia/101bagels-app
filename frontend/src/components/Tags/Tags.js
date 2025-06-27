import React from 'react'
import classes from './tags.module.css'
import { Link } from 'react-router-dom';

export default function Tags({tags, forItemPage}) {
  return (
    <div 
        className={classes.container} style={{
        justifyContent: forItemPage? 'start' : 'center',
    }}>{ tags.map(tag => (
            <Link key={tag.name} to={`/tag/${tag.name}`}>
                {tag.name} {!forItemPage && `(${tag.count})`}
            </Link>
    ))}
        </div>
  );
}
