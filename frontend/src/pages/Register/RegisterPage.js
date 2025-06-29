import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import classes from './registerPage.module.css'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterPage() {
    
    const auth = useAuth();
    const { user } = auth;
    
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/')
    }, [user]);
    
    const { handleSubmit, register, getValues, formState: {errors},} = useForm();
    
    const submit = async data => {
        await auth.register(data);
    }
  
  
    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Register" />
                <form onSubmit={handleSubmit(submit)}>
                <Input
                    type="text"
                    label="Name"
                    {...register('name', {
                        required: true, minLength: 5,
                    })}
                    error={errors.name}
                />

                <Input 
                    type="email"
                    label="Email Address"
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                            message: 'Invalid Email',
                        }
                    })}
                    error = {errors.email} 
                />

                <Input type="text" label="Password" {...register('password', {
                    required: true,
                    minLength: 8,
                })} error={errors.password} />

                <Input 
                    type="text"
                    label="Confirm Password"
                    {...register('confirmPassword', {
                        required: true,
                        validate: value => 
                            value !== getValues('password')
                            ? 'Passwords Do Not Match': true,
                    })}
                    error = {errors.confirmPassword} 
                />

                <Button type="submit" text="Register" />
                
                <div className={classes.login}>
                    Already a user? &nbsp;
                    <Link to={`/login?${returnUrl ? 'returnUrl=' + returnUrl : ''}`}>
                        Login Here
                    </Link>
                </div>




                </form>
            </div>
        </div>
  )
}
