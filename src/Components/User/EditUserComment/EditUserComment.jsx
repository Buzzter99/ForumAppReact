import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import userService from '../../../Services/userService';
import { useNavigate, useParams } from 'react-router';
export default function EditUserComment() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, dirtyFields }, setValue, trigger, watch
    } = useForm();
    const navigate = useNavigate();
    const { commentId } = useParams();
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const msg = watch('msg');
    useEffect(() => {
        userService.getCommentById(commentId).then((data) => {
            if (data.statusCode && data.statusCode !== 200) {
                navigate("/404");
            }
            else {
                setValue("msg", data.message);
                trigger();
            }
        }
        ).catch(() => {
            setApiErrorMessage('An error occurred. Please try again later.');
        });
    }, []);
    const onSubmit = (data) => {
        userService.editCommentById(commentId, data.msg).then((data) => {
            data.json().then((response) => {
                if (response.statusCode !== 200) {
                    setApiErrorMessage(response.message);
                } else {
                    setApiErrorMessage(null);
                    navigate(`/comments`);
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
        if (dirtyFields.msg) {
            trigger("msg");
        }
    }, [msg, trigger]);
    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 pt-10 pb-2">
            <div className="max-w-xl mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg p-8 border border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-100 text-center">
                    Edit Your Comment
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="msg" className="block text-sm font-medium text-gray-400 mb-2">
                            Comment Message
                        </label>
                        <textarea
                            id="msg"
                            {...register('msg', { required: 'Comment is required' })}
                            className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            rows="3"
                            placeholder="Edit your comment*"
                            onBlur={() => handleBlur('msg')}
                        ></textarea>
                        {errors.msg && (
                            <div className='mt-4'>
                                <ErrorMessage errorMessage={errors.msg.message} />
                            </div>
                        )}
                    </div>
                    {apiErrorMessage && (
                        <div className='mt-4'>
                            {<ErrorMessage errorMessage={'test'} />}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Edit Comment
                    </button>
                </form>
            </div>
        </div>
    );
};