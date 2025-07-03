import React, { useEffect } from 'react'
import classes from './loginPage.module.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {

    const {handleSubmit, register, formState : {errors},} = useForm();

    const navigate = useNavigate();
    const {user, login} = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;

        returnUrl ? navigate(returnUrl) : navigate('/menu');
    }, [user]);

    const submit = async ({email, password}) => {
        await login(email, password);
    };


  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Login" margin="0 0 1rem 0" />
            <form onSubmit={handleSubmit(submit)} noValidate>
            <Input type="email" label="Email Address" {...register('email', {
                required: true, 
                pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                    message: 'Invalid Email',
                }
            })}
            error ={errors.email}
            />

            <Input type="text" label="Password" {...register('password', {
                required: true,
            })} error={errors.password} />

            <Button type="submit" text="Login" />
            <div className={classes.register}>
                New user? &nbsp;
                <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                    Register Here
                </Link>
            </div>

            </form>
        </div>
    </div>
  )
}
