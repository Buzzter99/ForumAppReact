import './Login.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { login } from '../../../Services/userService';
import { useNavigate } from 'react-router';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm();
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const emailOrUsernameValue = watch('emailOrUsername');
  const passwordValue = watch('password');
  const disabledOnLoad = (emailOrUsernameValue && passwordValue);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    login(data.emailOrUsername, data.password).then((data) => {
      data.json().then((response) => {
        if (response.statusCode !== 200) {
          setApiErrorMessage(response.message);
        } else {
          setApiErrorMessage(null);
          navigate('/home');
        }
      })
    }).catch(() => {
      setApiErrorMessage('An error occurred. Please try again later.');
    });
  };
  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };
  return (
    <section className="flex justify-center items-center h-screen bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
        <div className="mb-4">
          <p className="text-gray-400">Sign In</p>
          <h2 className="text-xl font-bold text-white">Sign into your account</h2>
        </div>
        <div>
          <input
            {...register('emailOrUsername', { required: 'Email/Username is required' })}
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            onBlur={() => handleBlur('emailOrUsername')}
            placeholder="Email/Username*" />
          {errors.emailOrUsername && !emailOrUsernameValue && (
            <div className='mt-4'>
              <ErrorMessage errorMessage={errors.emailOrUsername.message} />
            </div>
          )}
        </div>
        <div>
          <input
            {...register('password', { required: 'Password is required' })}
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="password"
            onBlur={() => handleBlur('password')}
            placeholder="Password*"
          />
          {errors.password && !passwordValue && (
            <div className='mt-4'>
              <ErrorMessage errorMessage={errors.password.message} />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={!disabledOnLoad}
            className="w-full py-4 rounded text-sm font-bold transition duration-200 text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
            Sign In
          </button>
        </div>
        {apiErrorMessage && (<ErrorMessage errorMessage={apiErrorMessage} />
        )}
      </form>
    </section>
  );
};
export default Login;