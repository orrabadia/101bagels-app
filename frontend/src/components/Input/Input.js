import React from 'react'
import InputContainer from './InputContainer';
import classes from './input.module.css'

function Input({label, type, defaultValue, onChange, onBlur, name, error}, ref) {
  
    const getErrorMessage = () => {
        if (!error) return;
        if (error.message) return error.message;
        switch (error.type) {
            case 'required':
                return 'Field Required';
            case 'minLength' :
                return 'Field is Too Short';
            default:
                return '*';
        }
    }
  
  
    return (
    <InputContainer label={label}>
        <input defaultValue={defaultValue} className={classes.input}
        type={type} placeholder={label} ref={ref} name={name} onChange={onChange}
        onBlur={onBlur}/>
        {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  )
}

export default React.forwardRef(Input);
