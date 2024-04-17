import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../../components/ButtonComponent";
const { Option } = Select;
export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const [photoUrl, setPhotoUrl] = useState(null);
  const { t } = useTranslation();

  
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("author", user);
      postData.append("title", title);
      postData.append("summary", summary);
      postData.append("photo", photo);
      postData.append("content", content);

      const { data } = await axios.post(
        "http://localhost:4000/post/create-post",
        postData
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/adminDashboard/posts");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container mx-auto">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/2 mx-auto bg-white rounded-lg shadow">
        {" "}
        <div className="p-3">
        <h3 className="title text-3xl font-bold text-center mb-4 text-sky-700">
            <span className="border-b-4 border-indigo-500">Create Blog</span>
          </h3>
         
          <div className="mb-6 w-full" >
      <select className="form-input w-full" value={user} onChange={handleUserChange}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
   
    </div>
    {/* <div className="mb-6 w-full" >
    <label>
              <select
                className="form-input mt-2 block  w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              >
                <option>Select a User</option>
                {users.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                    className="py-2 px-4 hover:bg-blue-100"
                  >
                    <span className="text-blue-600 font-semibold">
                      {user.name}
                    </span>
                  </option>
                ))}
              </select>
            </label>

</div> */}
  <div className="mb-6">
            <input
              type="text"
              value={title}
              placeholder="Enter blog title"
              className="form-input w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <textarea
              value={summary}
              placeholder="Enter blog summary"
              className="form-textarea w-full h-40"
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
              {photo ? <span>{photo.name}</span> : <span>Upload Photo</span>}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {photoUrl && (
            <div className="mb-6">
              <img
                src={photoUrl}
                alt="Uploaded"
                className="w-full rounded-lg"
              />
            </div>
          )}
          <div className="mb-6">
            <textarea
              value={content}
              placeholder="Enter blog content"
              className="form-textarea w-full h-40"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="mb-6">
            {/* <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={handlePost}
            >
              Create Blog
            </button> */}

            
            <div className="flex justify-center">
              <ButtonComponent onClick={handlePost}
                title="Create Blog"
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
