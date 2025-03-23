import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import postService from "../../../Services/postService";
import dateTimeFormatter from "../../../utils/DatetimeFormatter";
import Spinner from "../../Spinner/Spinner";
import storageService from "../../../Services/storageService";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import "./Details.css";
export default function Details() {
  const { postId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    watch,
    trigger,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const {msg} = watch();
  async function getSinglePost() {
    postService
      .getSinglePost(postId)
      .then((data) => {
        if (data.statusCode && data.statusCode !== 200) {
          setSinglePost({});
          navigate("/404");
          return;
        }
        setSinglePost(data);
        setIsLiked(data.isLiked);
        setComments(data.comments);
      })
      .catch(() => {
        setSinglePost({});
      });
    storageService
      .getUrlForContent("/Apps/ForumAppReact/img_avatar.png")
      .then((data) => {
        data.json().then((response) => {
          data.statusCode !== 200
            ? setImageUrl({ message: "/img_avatar.png" })
            : setImageUrl(response);
        });
      })
      .catch(() => {
        setImageUrl({ message: "/img_avatar.png" });
      });
  }
  useEffect(() => {
    getSinglePost();
  }, []);
  const toggleLike = () => {
    postService.likePost(postId).then((data) => {
      data
        .json()
        .then((response) => {
          if (response.statusCode !== 200) {
            setApiErrorMessage(response.message);
            return;
          }
          setIsLiked(!isLiked);
        })
        .catch(() => {
          setApiErrorMessage("An error occurred. Please try again later.");
        });
    });
  };
  const addComment = (data) => {
    const apiData = { ...data, postId };
    postService.addComment(apiData).then((response) => {
      response
        .json()
        .then((data) => {
          if (response.status !== 200) {
            setApiErrorMessage(data.message);
            return;
          }
          getSinglePost();
          reset();
        })
        .catch(() => {
          setApiErrorMessage("An error occurred. Please try again later.");
        });
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
    <div className="bg-gray-800 text-gray-200 min-h-screen py-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gray-900 text-gray-200 rounded-lg shadow-md p-6 border border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-blue-400">
              {singlePost.topic}
            </h3>
            {singlePost.when && (
              <span className="text-sm text-gray-400">
                {dateTimeFormatter.formatDateTime(singlePost.when)}
                {singlePost.isAuth && !singlePost.isOwner && (
                  <button
                    type="button"
                    onClick={toggleLike}
                    className={`ms-3 p-1 rounded text-gray-400 hover:text-blue-500 transition ${!isLiked ? "like-button" : "unlike-button"
                      } liked-button`}
                    aria-label="Like post"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                    </svg>
                    <span className="sr-only">
                      {isLiked ? "Unlike" : "Like"}
                    </span>
                  </button>
                )}
              </span>
            )}
          </div>
          <p className="text-gray-300 mt-4">
            {singlePost.description}
            {singlePost.additionalInfo && ` (${singlePost.additionalInfo})`}
          </p>
          <div className="flex items-center mt-6">
            {imageUrl && (
              <img
                src={imageUrl.message}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-4"
              />
            )}
            {!imageUrl && (
              <div className="w-10 h-10 rounded-full">
                <Spinner />
              </div>
            )}
            {singlePost.who && (
              <p className="text-sm font-semibold text-gray-200">
                {singlePost.who.username}
              </p>
            )}
          </div>
        </div>

        {comments.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Comments</h3>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-900 text-gray-200 rounded-lg shadow-md p-4 border border-gray-700"
              >
                <div className="flex items-center">
                  {imageUrl && (
                    <img
                      src={imageUrl.message}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  )}
                  {!imageUrl && (
                    <div className="w-10 h-10 rounded-full">
                      <Spinner />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-gray-200">
                    {comment.who.username}
                  </p>
                </div>
                <p className="text-gray-300 mt-3">{comment.message}</p>
                <span className="block text-xs text-gray-500 mt-2">
                  {dateTimeFormatter.formatDateTime(comment.when)}
                </span>
              </div>
            ))}
          </div>
        )}
        {!singlePost.isOwner && singlePost.isAuth && (
          <div className="bg-gray-900 text-gray-200 rounded-lg shadow-md p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
              Add a Comment
            </h3>
            <form onSubmit={handleSubmit(addComment)}>
              <textarea
                {...register("msg", { required: "Comment is required" })}
                onBlur={() => handleBlur("msg")}
                className="w-full rounded-lg bg-gray-700 border border-gray-600 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                rows="3"
                placeholder="Write your comment here...*"
              ></textarea>
              {errors.msg && (
                <div className="mt-4">
                  <ErrorMessage errorMessage={errors.msg.message} />
                </div>
              )}
              {apiErrorMessage && (
                <div className="mt-4">
                  {<ErrorMessage errorMessage={apiErrorMessage} />}
                </div>
              )}
              <button
                type="submit"
                disabled={!isValid}
                className="mt-4 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
