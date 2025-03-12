import { useEffect, useState } from "react";
import { getCurrentUsers } from "../../Services/userService";
export default function Home() {
  const [currentUsers, setCurrentUsers] = useState([]);
  useEffect(() => {
    getCurrentUsers()
      .then((data) => {
        setCurrentUsers(data);
      })
      .catch(() => {
        setCurrentUsers([]);
      });
  }, []);
  return (
    <>
      <div className="bg-slate-500 p-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-4">
          Welcome to BusarovForum
        </h2>
        <p className="text-lg text-white text-center mb-4">
          Your go-to platform for discussing and sharing knowledge on a variety
          of topics. Join thousands of users discussing the latest trends in
          technology, business, entertainment, and more!
        </p>
        <p className="mb-6 text-lg text-white text-center">
          With an open and easy-to-use platform, BusarovForumApp empowers you to
          connect, collaborate, and grow your ideas with a community of
          like-minded individuals.
        </p>
        <div className="bg-blue-600 p-4 text-white rounded-md shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-center">
            Join the Conversation!
          </h3>
          <p className="text-lg text-center mt-2">
            Currently, there are{" "}
            <span className="font-bold">{currentUsers.length} users</span>{" "}
            browsing the app and discussing exciting topics!
          </p>
        </div>
        <h3 className="text-3xl font-semibold text-white text-center mb-6">
          Explore Topics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Technology</h4>
            <p className="text-gray-600 mt-2">
              Join discussions on the latest in tech, gadgets, and innovations.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Business</h4>
            <p className="text-gray-600 mt-2">
              Discuss business strategies, growth, and entrepreneurship.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">
              Entertainment
            </h4>
            <p className="text-gray-600 mt-2">
              From movies to gaming, talk about your favorite pastimes!
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">
              Health & Wellness
            </h4>
            <p className="text-gray-600 mt-2">
              Share tips on staying healthy, both mentally and physically.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Sports</h4>
            <p className="text-gray-600 mt-2">
              Discuss your favorite sports, teams, and games!
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900">Science</h4>
            <p className="text-gray-600 mt-2">
              Dive into the wonders of science, from space exploration to
              biology!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
