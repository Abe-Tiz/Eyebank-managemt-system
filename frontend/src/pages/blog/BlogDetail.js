import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../static/styles/BlogDetail.css";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";

const BlogDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (params?.slug) getPost();
  }, [params?.slug]);

  const getPost = async () => {
    try {
      const { data } = await axios.get(
        `https://eyebank-backend-2.onrender.com/post/get-post/${params.slug}`
      );
      setPost(data?.post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
        <h3 className="text-4xl font-extrabold text-center py-4 text-purple-700">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            {post.title}
          </span>
        </h3>{" "}
        <div className="px-6">
          <Link to="/Blog" className="block mb-4">
            <img
              src={`https://eyebank-backend-2.onrender.com/post/post-photo/${post._id}`}
              alt={post.title}
              className="object-cover w-3/4 h-64 mx-auto rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {post.content}
          </p>
        </div>
      

      <div className="flex justify-center">
             <ButtonComponent
                title="Back"
                onClick={()=>navigate(-1)}
                customClass="w-16 bg-sky-700 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
        {/* <div className="flex justify-center py-4">
          <button
            onClick={() => navigate(-1)}
            title="Back"
            className="bg-sky-700 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button> */}
        </div>
      </div>
  
  );
};

export default BlogDetails;
