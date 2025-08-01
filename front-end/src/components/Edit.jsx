import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchVideo() {
        try{
      const res = await fetch(`http://localhost:5000/api/video/${videoId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch video");
      console.log("Fetched video data:", data);
      setVideoData(data);
    }catch(error){
        console.error("Failed to Delete video", error)
        if (error.response?.status === 401) {
            alert("Session expired. Please login again");
            localStorage.clear();
            navigate("/login");
        }
    }
    }
    fetchVideo();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/video/${videoId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(videoData),
    });
    if (res.ok) {
      alert("Video updated successfully");
      if (videoData.channel) {
      navigate(`/channel/${videoData.channel._id}`);
      }else{
         console.error("No channel ID found in videoData");
      }
    }
  };
  if (!videoData) {
  return <p className="text-center mt-10 text-gray-500">Loading video data...</p>;
}

  return (
    videoData && (
      <div className="p-10 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Edit Video</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label for="title" className="font-bold">Video Title</label>
          <input
            value={videoData.title}
            name="title"
            onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
            className="border p-2"
            placeholder="Title"
          />
          <label for="thumbnail" className="font-bold">Thumbnail URL</label>
          <input
            value={videoData.thumbnailUrl}
            name="thumbnail"
            onChange={(e) => setVideoData({ ...videoData, thumbnailUrl: e.target.value })}
            className="border p-2"
            placeholder="Thumbnail URL"
          />
          <label for="description" className="font-bold">Video Description</label>
          <textarea
            value={videoData.description}
            name="description"
            onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
            className="border p-2"
            placeholder="Description"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Save Changes
          </button>
        </form>
      </div>
    )
    

  );
}
