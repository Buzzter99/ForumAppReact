import "./Navigation.css";
import { Link, useNavigate, useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import userService from "../../Services/userService";
export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [previousPath, setPreviousPath] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      userService.isAuthenticated()
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setData({});
        });
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);
  useEffect(() => {
    if (location.pathname === '/home' && previousPath === '/login') {
      userService.isAuthenticated()
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setData({});
        });
    }
  }, [location]);
  async function logoutFromApp() {
    userService.logout().then(() => {
      setData(null);
    })
      .catch(() => {
        setData(null);
      });
    navigate("/home");
  }
  return (
    <nav className="dark:bg-gray-900 w-full z-20 top-0 start-0 sticky-header">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-centerrtl:space-x-reverse">
          <img src="/react.svg" alt="react-logo" className="h-8"></img>
          <span className="text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
            BusarovForumApp
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"></div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className={`${data && data.statusCode === 200 ? "auth-ul" : "guest-ul"
              } flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}
          >
            <li>
              <Link
                to="/home"
                className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all"
                className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                All Posts
              </Link>
            </li>
            {data && data.statusCode === 200 ? (
              <>
                <li>
                  <Link
                    to="/create"
                    className="text-white py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create New Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/comments"
                    className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My Comments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/updateAccount"
                    className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logoutFromApp}
                    className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                  >
                    Logout
                  </Link>
                </li>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{data && data.statusCode === 200 && data.message}</span>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
