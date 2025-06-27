import React, {defaultProps} from 'react'
import classes from './notFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound({
  show = false,
  message = 'Nothing Found!',
  linkRoute = '/menu',
  linkText = 'Go To Menu',
  showButton = false,
}) {
  if (!show) return null;

  return (
    <div className={classes.container}>
      <p>{message}</p>
      {showButton && (
        <Link to={linkRoute}>{linkText}</Link>
      )}
    </div>
  );
}
