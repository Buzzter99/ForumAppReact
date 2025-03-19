import { Link } from "react-router";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SuccessMessage from "../../SuccessMessage/SuccessMessage";
import { useState, useEffect } from "react";
import postService from "../../../Services/postService";
import dateTimeFormatter from "../../../utils/DatetimeFormatter";
import "./Comments.css";
export default function Comments() {
  const [userComments, setUserComments] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [apiSuccessMessage, setApiSuccessMessage] = useState("");
  useEffect(() => {
    postService.getCommentsForUser().then((data) => {
      data
        .json()
        .then((response) => {
          if (response.statusCode && response.statusCode !== 200) {
            setApiErrorMessage(response.message);
          } else {
            setApiErrorMessage(null);
            setUserComments(response);
          }
        })
        .catch(() => {
          setApiErrorMessage("An error occurred. Please try again later.");
        });
    });
  }, []);
  async function deleteComment(postId, commentId) {
    postService.deleteComment(postId, commentId).then((data) => {
      data
        .json()
        .then((response) => {
          if (response.statusCode === 200) {
            setApiSuccessMessage(response.message);
            setTimeout(() => {
              setApiSuccessMessage("");
            }, 3000);
            setUserComments((prevComments) => {
              return prevComments.filter((comment) => {
                return comment.comment._id !== commentId;
              });
            });
          } else {
            setApiErrorMessage(response.message);
            setTimeout(() => {
              setApiErrorMessage("");
            }, 3000);
          }
        })
        .catch(() => {
          setApiErrorMessage("An error occurred. Please try again later.");
        });
    });
  }
  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen py-2">
      {userComments.length > 0 &&
        userComments.map((userComment) => (
          <div
            key={userComment.comment._id}
            className="bg-gray-900 text-gray-200 shadow-xl rounded-lg p-8 border border-gray-700 mb-8 w-full max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-blue-400">
                {userComment.comment.who.username}
              </h3>
              <span className="text-sm text-gray-400">
                {dateTimeFormatter.formatDateTime(userComment.comment.when)}
              </span>
            </div>
            <p className="text-gray-300 mb-5">{userComment.comment.message}</p>
            <div className="border-t border-gray-600 pt-5 mt-4">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex space-x-4">
                  <Link
                    to={`/all/${userComment.postId}`}
                    className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Go To Post
                  </Link>
                  <Link
                    to={`/comments/edit/${userComment.comment._id}`}
                    className="bg-gray-700 hover:bg-gray-800 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      deleteComment(userComment.postId, userComment.comment._id)
                    }
                    className="delete-btn bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {apiSuccessMessage && (
        <SuccessMessage
          successMessageHeader={"Success!"}
          successMessageContent={apiSuccessMessage}
        />
      )}
      {apiErrorMessage && (
        <div className="dark:bg-gray-900 shadow-xl rounded-lg p-8 border border-gray-700  w-full max-w-2xl mx-auto bg-gray-900">
          {<ErrorMessage errorMessage={apiErrorMessage} />}
        </div>
      )}
    </div>
  );
}
