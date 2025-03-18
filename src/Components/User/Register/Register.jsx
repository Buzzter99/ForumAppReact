import './Register.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import userService from '../../../Services/userService';
import { useNavigate } from 'react-router';
const Register = () => {
    const { register, handleSubmit, trigger, formState: { errors, isValid,dirtyFields }, watch, } = useForm();
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const navigate = useNavigate();
    const email = watch('email');
    const username = watch('username');
    const password = watch('password');
    const repeatPassword = watch('repeatPassword');
    const onSubmit = (data) => {
        userService.register(data.email, data.username, data.password, data.repeatPassword).then((data) => {
            data.json().then((response) => {
                if (response.statusCode !== 200) {
                    setApiErrorMessage(response.message);
                } else {
                    setApiErrorMessage(null);
                    navigate('/login');
                }
            })
        }).catch(() => {
            setApiErrorMessage('An error occurred. Please try again later.');
        });
    };
    const handleBlur = async (fieldName) => {
        await trigger(fieldName);
    };
    useEffect(() => {
        if (email || (dirtyFields.email && email === '')) {
            trigger("email");
        }
        if (username || (dirtyFields.username && username === '')) {
            trigger("username");
        }
        if (password || (dirtyFields.password && password === '')) {
            trigger("password");
        }
        if (repeatPassword || (dirtyFields.repeatPassword && repeatPassword === '')) {
            trigger("repeatPassword");
        }
    }, [email, username, password, repeatPassword, trigger]);
    return (
        <section className="flex justify-center items-center h-screen bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
                <div className="mb-4">
                    <p className="text-gray-400">Register</p>
                    <h2 className="text-xl font-bold text-white">Join our community</h2>
                </div>
                <div>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                        type="text"
                        onBlur={() => handleBlur('email')}
                        placeholder="Email*"
                    />
                    {errors.email && <div className='mt-4'>
                        <ErrorMessage errorMessage={errors.email.message} />
                    </div>}
                </div>
                <div>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                        type="text"
                        onBlur={() => handleBlur('username')}
                        placeholder="Username*"
                    />
                    {errors.username && <div className='mt-4'>
                        <ErrorMessage errorMessage={errors.username.message} />
                    </div>}
                </div>
                <div>
                    <input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                        type="password"
                        onBlur={() => handleBlur('password')}
                        placeholder="Password*"
                    />
                    {errors.password && <div className='mt-4'>
                        <ErrorMessage errorMessage={errors.password.message} />
                    </div>}
                </div>
                <div>
                    <input
                        {...register('repeatPassword', {
                            required: 'Repeat Password is required',
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                        type="password"
                        onBlur={() => handleBlur('repeatPassword')}
                        placeholder="Repeat Password*"
                    />
                    {errors.repeatPassword && <div className='mt-4'>
                        <ErrorMessage errorMessage={errors.repeatPassword.message} />
                    </div>}
                </div>
                {apiErrorMessage && <div className='mt-4'>
                    <ErrorMessage errorMessage={apiErrorMessage} />
                </div>}
                <div>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full py-4 rounded text-sm font-bold transition duration-200 text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
                        Sign Up
                    </button>
                </div>
            </form>
        </section>
    );
};
export default Register;
