import React from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../hooks/useAuth';
import Input from '../Input/Input';
import Title from '../Title/Title';
import Button from '../Button/Button';

export default function ChangePassword() {

    const {handleSubmit, register, getValues, formState: {errors}} = useForm();

    const { changePassword } = useAuth();
    
    const submit = passwords => {
        changePassword(passwords)
    }

    return (
        <div>
            <Title title="Change Password" />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    type="password"
                    label="Current Password"
                    {...register('currentPassword', {
                        required: true
                    })}
                    error={errors.currentPassword}
                />
                <Input
                    type="password"
                    label="New Password"
                    {...register('newPassword', {
                        required: true,
                        minLengh: 8,
                    })}
                    error={errors.newPassword}
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    {...register('confirmNewPassword', {
                        required: true,
                        validate: value =>
                            value != getValues('newPassword') ?
                            'Passworeds Do Not Match' : true,
                    })}
                    error={errors.confirmNewPassword}
                />
                <Button type="submit" text="Change Password"/>
            </form>
        </div>
    )
}
