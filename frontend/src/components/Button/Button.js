import classes from './button.module.css';

export default function Button({
    type = 'button',
    text = 'Submit',
    onClick,
    color = 'white',
    backgroundColor = 'var(--dark-sky-blue)',
    fontSize = '1.3rem',
    width = '12rem',
    height = '3.5rem',
}) {
  return (
    <div className={classes.container}>
        <button
            style={{
                color,
                backgroundColor,
                fontSize,
                width,
                height,
            }}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    </div>
  );
}
