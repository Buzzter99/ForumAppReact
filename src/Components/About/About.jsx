import "./About.css";
import userService from "../../Services/userService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../Contexts/AuthProvider";
export default function About() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    userService
      .isAuthenticated()
      .then((data) => {
        login(data);
      })
      .catch(() => {
        logout();
      });
  }, []);
  const navigateToPage = (page) => {
    navigate(`/${page}`);
  };
  return (
    <div className="bg-custom-gray p-6">
      <div className="container">
        <h1>About Busarov Forum</h1>
        <p>
          Welcome to Busarov Forum, your platform to connect, engage, and share
          ideas with like-minded individuals. Our mission is to bring
          communities closer together through open discussions and meaningful
          interactions.
        </p>
        <p>
          Whether you&apos;re here to learn, share your knowledge, or simply
          explore, Busarov Forum is the place for you. Join us and be part of a
          growing global community.
        </p>
        {user.statusCode === 200 ? (
          <button onClick={() => navigateToPage("all")}>Check All Posts</button>
        ) : (
          <button onClick={() => navigateToPage("register")}>Register</button>
        )}
      </div>
    </div>
  );
}
