import "./Navigation.css";
import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, use } from "react";
import userService from "../../Services/userService";
import storageService from "../../Services/storageService";
import Spinner from "../Spinner/Spinner";
import { useUser } from "../../Contexts/AuthProvider";
export default function Navigation() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  const [reactSvg, setReactSvg] = useState(null);
  const fetchData = async () => {
    userService
      .isAuthenticated()
      .then((data) => {
        login(data);
      })
      .catch(() => {
        logout();
      });
  };
  useEffect(() => {
    storageService
      .getUrlForContent("/Apps/ForumAppReact/react.svg")
      .then((data) => {
        data.json().then((response) => {
          response.statusCode !== 200
            ? setReactSvg({ message: "/react.svg" })
            : setReactSvg(response);
        });
      })
      .catch(() => {
        setReactSvg({ message: "/react.svg" });
      });
    userService
      .isAuthenticated()
      .then((data) => {
        login(data);
      })
      .catch(() => {
        logout();
      });
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  async function logoutFromApp() {
    userService
      .logout()
      .then(() => {
        logout();
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        navigate("/home");
      });
  }
  return (
    <nav className="dark:bg-gray-900 w-full z-20 top-0 start-0 sticky-header">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-centerrtl:space-x-reverse">
          {reactSvg && (
            <img src={reactSvg.message} alt="React SVG" className="h-8"></img>
          )}
          {!reactSvg && (
            <div className="w-10 h-10 rounded-full">
              <Spinner />
            </div>
          )}
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
            className={`${
              user.statusCode === 200 ? "auth-ul" : "guest-ul"
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
            {user.statusCode === 200 ? (
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
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  {user.statusCode === 200 ? user.message : ""}
                </span>
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
