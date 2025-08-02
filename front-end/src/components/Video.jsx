import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Comments from "./Comments";

export default function Video() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState();
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const previewLength = 200;
  const token = localStorage.getItem("token")


useEffect(() => {
  async function fetchVideos() {
    try {
      const res = await fetch(`http://localhost:5000/api/video/${videoId}`, {
        headers: {
          'content-type': 'application/json',
        }
      });

if (!res.ok) {
  const errText = await res.text();
  throw new Error(`API Error: ${res.status} - ${errText}`);
}
      const responseData = await res.json();
      setVideoData(responseData); 
    } catch (error) {
      console.error("Failed to load video", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again");
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  fetchVideos();
}, [videoId, navigate]);



  async function like() {
    try{
      const res = await fetch(`http://localhost:5000/api/video/${videoId}/like`,{
        method:"PATCH",
        headers:{
          'content-type': 'application/json',
          "Authorization": token,
        }
      });
      if(!res.ok){
        const errText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errText}`);
      }
      const updatedRes = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
      const updatedData = await updatedRes.json();
      setVideoData(updatedData);
    }catch(error){
      console.error("Failed to load video", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again");
        localStorage.clear();
        navigate("/login");
    }
    
  }
}

  async function dislike() {
    try{
      const res = await fetch(`http://localhost:5000/api/video/${videoId}/dislike`,{
        method:"PATCH",
        headers:{
          'content-type': 'application/json',
          "Authorization": token,
        }
      });
      if(!res.ok){
        const errText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errText}`);
      }
      const updatedRes = await fetch(`http://localhost:5000/api/video/info/${videoId}`);
      const updatedData = await updatedRes.json();
      setVideoData(updatedData);
    }catch(error){
      console.error("Failed to load video", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again");
        localStorage.clear();
        navigate("/login");
    }
    
  }
}


return (
  <>
    {videoData ? (
      <div className="p-10 max-w-screen-md sm:mx-auto mx-10 ">
        <iframe
          className="w-full aspect-video rounded-lg"
          src={videoData.videoUrl}
          title={videoData.title}
          allowFullScreen
        ></iframe>

        <h1 className="text-xl font-bold mt-4">{videoData.title}</h1>
        <p className="text-gray-600 mt-1">by <span className="font-medium underline">{videoData.channel?.channelName}</span></p>

<p className="mt-3 text-gray-800 leading-relaxed">
  {showMore || videoData.description.length <= previewLength
    ? videoData.description
    : `${videoData.description.slice(0, previewLength)}...`}
  {videoData.description.length > previewLength && (
    <button
      onClick={() => setShowMore(!showMore)}
      className="text-red-500 ml-2 font-medium hover:underline"
    >
      {showMore ? "Read Less" : "Read More"}
    </button>
  )}
</p>
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center text-lg">{videoData.views} views</div>
          <button className="flex text-xl items-center gap-1 cursor-pointer" onClick={like} ><AiFillLike className="hover:scale-110 text-2xl text-blue-500" />{videoData.likes} </button>
          <button className="flex text-xl items-center gap-1 cursor-pointer " onClick={dislike}><AiFillDislike className="hover:scale-110 text-2xl text-red-500 " />{videoData.dislikes}</button> 
        </div>
      <Comments videoId={videoData._id}/>
      </div>
    ) : (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>
    )}
  </>
);

}