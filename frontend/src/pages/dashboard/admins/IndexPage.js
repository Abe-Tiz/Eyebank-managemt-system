import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();
const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://eyebank-backend-2.onrender.com/user");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // get all posts
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("https://eyebank-backend-2.onrender.com/post/get-post");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="row dashboard">
      <div className="col-md-9">
      
        <h1
          className="text-4xl text-center font-bold   mb-8 text-sky-700"
          style={{
            borderBottom: "2px solid sky-700",
            letterSpacing: "2px",
            textTransform: "capitalize",
          }}
        >
          All Blogs
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Photo
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Title
                </th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Author
                </th> */}
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Summary
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Action
                </th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300"></th> */}
              </tr>
            </thead>
            <tbody>
              {posts?.map((p, index) => {
                // Find the user object with matching ID
                const user = users.find((user) => user.id === p.author);

                return (
                  <tr
                    key={p._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <img
                        src={`https://eyebank-backend-2.onrender.com/post/post-photo/${p._id}`}
                        alt={p.title}
                        className="w-96 h-24 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {t(p.title)}
                    </td>
                  <td
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"
                      style={{ textAlign: "justify" }}
                    >
                      {t(p.summary)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-300">
                      <Link
                        to={`/adminDashboard/edit-post/${p.slug}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-sky-700 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition duration-150 ease-in-out"
                      >
                        {t("indexPage:Edit")}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Posts;
