import React from 'react'
import classes from './profilePage.module.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth.js';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const { user, updateProfile } = useAuth();

    const submit = async user => {
        await updateProfile(user);
    }


  return (
    <div className={classes.container}>
        <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
            <Input defaultValue={user.name}
                type="text"
                label="Name" 
                {...register('name', {
                    required: true,
                    minLength: 5,
                    pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must contain only letters and spaces"
                    }
                 })}
                error={errors.name} 
            /> 
            {/* <Input defaultValue={user.number}
                type="text"
                label="Phone Number" 
                {...register('number', {
                    required: true,
                    minLength: 10, })}
                error={errors.number} 
            />  */}
            <Button type="submit" text="Update" />
        </form>
        <ChangePassword />
        </div>           

    </div>
  )
}
