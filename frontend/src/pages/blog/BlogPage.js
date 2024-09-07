import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { formatISO9075 } from "date-fns";
import { useTranslation } from "react-i18next";
import "../../static/styles/Blog.css";
const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("https://eyebank-backend-2.onrender.com/post/get-post");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="row dashboard">
      <div className="col-md-9">
        <h2 class="text-center text-4xl font-bold my-8 text-blue-700">
          <span class="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Unlock the Secrets to Stunning Eye Care
          </span>
        </h2>
        <div
          className="blog-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{ marginLeft: "-10px" }}
        >
          {posts.map((p) => (
            <Link key={p._id} to={`/adminDashboard/posts/${p.slug}`} className="blog-link">
              <div className="blog-item bg-white rounded-lg shadow">
                <div className="blog-image">
                  <Link to={`/blog/${p.slug}`}>
                    <img
                      src={`https://eyebank-backend-2.onrender.com/post/post-photo/${p._id}`}
                      alt={p.title}
                      className="w-full object-cover rounded-t-lg max-h-80"
                      style={{ marginLeft: "-10px" }}
                    />
                  </Link>
                </div>
                <div className="blog-details p-4">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg">
                  <Link to={`/blog/${p.slug}`}>
                    <h4 className="text-white text-lg font-bold">{p.title}</h4>
                    </Link>
                  </div>
                  <Link to={`/blog/${p.slug}`}>
                  <div className="blog-summary">
                    <p className="text-gray-700">{p.summary}</p>
                  </div>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
