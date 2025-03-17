import { useParams, useNavigate } from "react-router"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import postService from "../../../Services/postService";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
export default function Edit() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const { handleSubmit, formState: { errors, isValid }, register, trigger, setValue, watch } = useForm();
    const topic = watch('topic');
    const description = watch('description');
    useEffect(() => {
        postService.getSinglePost(postId).then((data) => {
            if ((data.statusCode && data.statusCode !== 200) || (!data.isOwner)) {
                navigate("/404");
            }
            else {
                setValue("topic", data.topic);
                setValue("description", data.description);
                setValue("additionalInfo", data.additionalInfo);
                trigger();
            }
        })
    }, []);
    const onSubmit = (data) => {
        const apiData = { postId, ...data };
        postService.editPostById(apiData).then((data) => {
            data.json().then((response) => {
                if (response.statusCode !== 200) {
                    setApiErrorMessage(response.message);
                } else {
                    setApiErrorMessage(null);
                    navigate(`/all`);
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
        trigger("topic");
        trigger("description");
    }, [topic, description, trigger]);
    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 pt-10 pb-2">
            <div className="max-w-xl mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg p-8 border border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-100 text-center">Edit Forum Post</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-400 mb-2">Topic</label>
                        <input
                            {...register("topic", { required: "Topic is required" })}
                            onBlur={() => handleBlur('topic')}
                            id="topic"
                            type="text"
                            className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            placeholder="Enter the topic*" />
                        {errors.topic && (
                            <div className='mt-4'>
                                <ErrorMessage errorMessage={errors.topic.message} />
                            </div>
                        )}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="problem" className="block text-sm font-medium text-gray-400 mb-2">Problem Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            onBlur={() => handleBlur('description')}
                            id="problem"
                            className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            rows="4"
                            placeholder="Describe the problem*"
                        />
                        {errors.description && (
                            <div className='mt-4'>
                                <ErrorMessage errorMessage={errors.description.message} />
                            </div>
                        )}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-400 mb-2">Additional Information</label>
                        <textarea
                            {...register("additionalInfo")}
                            id="additionalInfo"
                            className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            rows="3"
                            placeholder="Provide additional details (optional)"
                        />
                    </div>
                    {apiErrorMessage && (<ErrorMessage errorMessage={apiErrorMessage} />)}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Edit Post
                    </button>
                </form>
            </div>
        </div>
    );
}