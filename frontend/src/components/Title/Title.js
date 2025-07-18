import React from 'react'
import classes from './title.module.css'

export default function Title({title, fontSize, margin}) {
  return <h1 style={{fontSize, margin, color: 'var(--black)'}}>{title}</h1>;
}
