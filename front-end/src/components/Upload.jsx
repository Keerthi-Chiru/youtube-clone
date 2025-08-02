import { useEffect, useState } from "react";

export default function Upload() {
  // State to hold the form data
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    thumbnailUrl: "",
    description: "",
    category: "",
    channelName: ""
  });

  // State to hold user's channels for the select dropdown
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Fetch channels owned by the user to populate dropdown
    async function fetchChannels() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/channel", {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setChannels(data.channels);
        } else {
          console.warn("No channels found for this user");
        }
      } catch (error) {
        console.error("Failed to load channels", error.response?.data || error.message);
        if (error.response?.status === 401) {
          alert("Session expired please login again");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    fetchChannels();
  }, []);

  // Update form data when inputs/select change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submission to upload video
  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/video/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Video uploaded successfully");

      // Reset form fields after successful upload
      setFormData({
        title: "",
        videoUrl: "",
        thumbnailUrl: "",
        description: "",
        category: "",
        channelName: ""
      });
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired please login again");
        localStorage.clear();
        window.location.href = "/login";
      }
      // Optional: handle other errors here
    }
  };

  return (
    <>
      {/* Upload form container */}
      <div className="mt-12 flex items-center justify-center bg-gray-100">
        <form onSubmit={handleUpload} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl text-red-500 font-bold mb-6 text-center">Upload new video</h1>

          {/* Video title */}
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            onChange={handleChange}
            required
            value={formData.title}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Video URL */}
          <input
            type="text"
            name="videoUrl"
            placeholder="Video URL"
            onChange={handleChange}
            value={formData.videoUrl}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Thumbnail URL */}
          <input
            type="text"
            name="thumbnailUrl"
            placeholder="Video Thumbnail URL"
            onChange={handleChange}
            value={formData.thumbnailUrl}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Video Description"
            onChange={handleChange}
            value={formData.description}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Video Category"
            onChange={handleChange}
            value={formData.category}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Channel selection dropdown */}
          <select
            name="channelName"
            onChange={handleChange}
            value={formData.channelName}
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Channel</option>
            {channels.length > 0 &&
              channels.map((channel) => (
                <option key={channel._id} value={channel.channelName}>
                  {channel.channelName}
                </option>
              ))}
          </select>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
