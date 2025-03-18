import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import postService from "../../../Services/postService";
import { useNavigate } from "react-router";
export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    trigger,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const topic = watch("topic");
  const description = watch("description");
  const onSubmit = (data) => {
    postService
      .addPost(data)
      .then((data) => {
        data.json().then((data) => {
          if (data.statusCode === 200) {
            navigate("/all");
          } else {
            setApiErrorMessage(data.message);
          }
        });
      })
      .catch(() => {
        setApiErrorMessage("An error occurred. Please try again later.");
      });
  };
  useEffect(() => {
    if (topic || (dirtyFields.topic && topic === "")) {
      trigger("topic");
    }
    if (description || (dirtyFields.description && description === "")) {
      trigger("description");
    }
  }, [topic, description, trigger]);

  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };
  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex items-start justify-center pt-10 pb-2">
      <div className="max-w-lg mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-100 text-center">
          Create a New Forum Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Topic
            </label>
            <input
              id="topic"
              type="text"
              {...register("topic", { required: "Topic is required" })}
              onBlur={() => handleBlur("topic")}
              className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
              placeholder="Enter the topic*"
            />
            {errors.topic && (
              <div className="mt-4">
                <ErrorMessage errorMessage={errors.topic.message} />
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="problem"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Problem Description
            </label>
            <textarea
              id="problem"
              {...register("description", {
                required: "Description is required",
              })}
              onBlur={() => handleBlur("description")}
              className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
              rows="4"
              placeholder="Describe the problem*"
            ></textarea>
            {errors.description && (
              <div className="mt-4">
                <ErrorMessage errorMessage={errors.description.message} />
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              {...register("additionalInfo")}
              className="block w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
              rows="3"
              placeholder="Provide additional details (optional)"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Discussion
          </button>
          {apiErrorMessage && (
            <div className="mt-4">
              {<ErrorMessage errorMessage={apiErrorMessage} />}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
