import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent";
import { Button } from "@chakra-ui/react";
const { Option } = Select;

const UpdatePost = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(
        `https://eyebank-backend-2.onrender.com/post/get-post/${params.slug}`
      );
      setTitle(data.post.title);
      setId(data.post._id);
      setSummary(data.post.summary);
      setContent(data.post.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
    //eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("summary", summary);
      photo && postData.append("photo", photo);
      postData.append("content", content);
      const { data } = axios.put(
        `https://eyebank-backend-2.onrender.com/post/update-post/${id}`,
        postData
      );
      
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("blog Updated Successfully");
        navigate("/adminDashboard/posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this blog ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://eyebank-backend-2.onrender.com/post/delete-post/${id}`
      );
      toast.success("Post Deleted Succfully");
      navigate("/adminDashboard/posts");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <div className="w-full md:w-4/3 lg:w-1/2 xl:w-1/2 mx-auto bg-white rounded-lg shadow">
        <div className="px-6 py-4">
          <h1
            className="text-4xl text-center font-bold mb-8 text-sky-700"
            style={{
              letterSpacing: "2px",
              textTransform: "capitalize",
            }}
          >
            Update Blog
          </h1>

          <div className="mb-4">
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center h-32">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="50px"
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`https://eyebank-backend-2.onrender.com/post/post-photo/${id}`}
                    alt="blog_photo"
                    height="200px"
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Write Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder={t("updateProduct:writename")}
                className="w-full border border-gray-300 rounded py-2 px-3 text-sm"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Write Summary
              </label>
              <textarea
                id="summary"
                value={summary}
                placeholder={t("updateProduct:writeDescription")}
                className="w-full border border-gray-300 rounded py-2 px-3 text-sm resize-none h-32"
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Write Content
              </label>
              <textarea
                id="content"
                value={content}
                placeholder={t("updateProduct:writeContent")}
                className="w-full border border-gray-300 rounded py-2 px-3 text-sm resize-none h-48"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mb-3 flex justify-end">
             

              <div className="flex justify-center">
              <ButtonComponent onClick={handleUpdate}
                title="Update Post"
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
          
              <div className="flex justify-center">
              <ButtonComponent onClick={handleDelete}
                title="Delete Post"
                customClass="bg-red-600 hover:bg-red-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;