import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAwareness() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("photo", photo);
      formData.append("video", video);
     
      const result = await axios.post("http://localhost:4000/createAwareness", formData);
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const hasFilledData = title || content || photo || video;

  return (
    <div className="flex justify-center pt-2">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-lg rounded px-8 pt-8 pb-4 mb-2">
          <h2 className="text-2xl font-bold mb-3 pt-1 text-center"> Update Awareness</h2>
          <form onSubmit={handleSubmit} >
            <div className="mb-4">
          
 
        <input
            className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="title"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div className="mb-6">
           
          <textarea
             className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
               id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content here..."
                rows={4}
              ></textarea>
            </div>
            <div className="mb-6">
            {/* <label
                      htmlFor="age"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Photo
                    </label> */}
         <input
            className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
               id="photo"
                onChange={handlePhotoChange}
                type="file"
                accept="image/*"
              />
            </div>
            <div className="mb-6">
            
        <input
          className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
               id="video"
                onChange={handleVideoChange}
                type="file"
                accept="video/*"
              />
            </div>
            {photoUrl && (
              <div className="mb-4">
                <img
                  src={photoUrl}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
                type="button"
              >
                Cancel
              </button>
              <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
             >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAwareness;