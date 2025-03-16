import { useEffect, useState } from "react";
import postService from "../../../Services/postService";
import { Link } from "react-router";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SuccessMessage from "../../SuccessMessage/SuccessMessage";
import dateTimeFormatter from "../../../utils/DatetimeFormatter";
export default function All() {
    const [posts, setPosts] = useState([]);
    const [successMessageHeader, setSuccessMessageHeader] = useState(null);
    const [successMessageContent, setSuccessMessageContent] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    useEffect(() => {
        postService.getAllPosts()
            .then((data) => {
                setPosts(data);
            })
            .catch(() => {
                setPosts([]);
            });
    }, []);
    async function deletePost(postId) {
        postService.deletePostById(postId)
            .then((response) => {
                if (response.statusCode != 200) {
                    setErrorMessage(response.message);
                    setShowErrorMessage(true);
                    setTimeout(() => {
                        setShowErrorMessage(false);
                    }, 3000);
                } else {
                    setErrorMessage(null);
                    setSuccessMessageHeader('Successfully deleted');
                    setSuccessMessageContent(response.message);
                    setShowSuccessMessage(true);
                    const updatedPosts = posts.filter((post) => post._id !== postId);
                    setPosts(updatedPosts);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                }
            })
            .catch(() => {
                setShowErrorMessage(true);
                setErrorMessage('Failed to delete post please try again later.');
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 3000);
            });
    }
    return (
        <div className="bg-gray-800 text-gray-200 min-h-screen py-2">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.length > 0 &&
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-gray-900 text-gray-200 shadow-lg rounded-lg p-6 border border-gray-700">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-blue-400">{post.topic}</h3>
                                <span className="text-sm text-gray-400">
                                    {dateTimeFormatter.formatDateTime(post.when)}
                                </span>
                            </div>
                            <p className="text-gray-300 mt-4">{post.description}</p>
                            <div className="flex items-center mt-6">
                                <img
                                    src="/img_avatar.png"
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-200">{post.who.username}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    to={`/all/${post._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    View Details
                                </Link>
                                {post.isOwner && (
                                    <>
                                        <Link
                                            to={`/edit/${post._id}`}
                                            className="bg-gray-700 hover:bg-gray-800 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            onClick={() => deletePost(post._id)}
                                            className="bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transform transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
                                            Delete
                                        </Link>
                                    </>
                                )}
                                <div className="flex space-x-3 text-sm text-gray-400">
                                    <span className="flex items-center space-x-1">
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 8h10M7 12h4"
                                            />
                                        </svg>
                                        <span>
                                            {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                                        </span>
                                    </span>
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 122.88 106.16"
                                        xmlSpace="preserve"
                                        width="20px"
                                        height="20px"
                                    >
                                        <g>
                                            <path
                                                className="st0"
                                                fill="#2563EB"
                                                d="M4.02,44.6h27.36c2.21,0,4.02,1.81,4.02,4.03v53.51c0,2.21-1.81,4.03-4.02,4.03H4.02 c-2.21,0-4.02-1.81-4.02-4.03V48.63C0,46.41,1.81,44.6,4.02,44.6L4.02,44.6z M63.06,4.46c2.12-10.75,19.72-0.85,20.88,16.48 c0.35,5.3-0.2,11.47-1.5,18.36l25.15,0c10.46,0.41,19.59,7.9,13.14,20.2c1.47,5.36,1.69,11.65-2.3,14.13 c0.5,8.46-1.84,13.7-6.22,17.84c-0.29,4.23-1.19,7.99-3.23,10.88c-3.38,4.77-6.12,3.63-11.44,3.63H55.07 c-6.73,0-10.4-1.85-14.8-7.37V51.31c12.66-3.42,19.39-20.74,22.79-32.11V4.46L63.06,4.46z"
                                            />
                                        </g>
                                    </svg>

                                    <div>{post.likes.length}</div>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
            {showSuccessMessage && (<SuccessMessage successMessageHeader={successMessageHeader} successMessageContent={successMessageContent} />)}
            {showErrorMessage && <div className='max-w-2xl mx-auto mt-4'><ErrorMessage errorMessage={errorMessage} /></div>}
        </div>
    );
};