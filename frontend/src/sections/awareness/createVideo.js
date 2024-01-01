import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("video", video);

      const result = await axios.post("http://localhost:4000/createVideo", formData);
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
    setVideoUrl(URL.createObjectURL(e.target.files[0]));
  };

  const hasFilledData = title || description || video || date;

  return (
    <div className="flex justify-center pt-2">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-lg rounded px-8 pt-8 pb-4 mb-2">
          <h2 className="text-2xl font-bold mb-3 pt-1 text-center">
            Create Video
          </h2>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <input
                className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="date"
                type="date"
                placeholder="Enter Video Upload Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <textarea
                className="rounded border shadow-md p-2 w-full text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write Video description here..."
                rows={4}
              ></textarea>
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

            {videoUrl && (
              <div className="mb-4">
                <video
                  src={videoUrl}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-md"
                  controls
                />
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!hasFilledData}
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

export default CreateVideo;