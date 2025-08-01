import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function Channel(){
    const { channelId } = useParams();
    const [channel, setChannel] = useState();
    const [videos, setVideos] = useState([]);
    const token = localStorage.getItem("token")


    useEffect(()=>{
        
        async function fetchVideos(){
            
            try {
                const res = await fetch(`http://localhost:5000/api/video/channel/${channelId}`, {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': token
                        }
                        });
                const data = await res.json();
                if(!res.ok){
                    throw new Error(`API Error: ${res.status}`);
                }
                setVideos(data.videos);

            } catch(error){
                console.error("Failed to load video", error);
                if (error.response?.status === 401) {
                    alert("Session expired. Please login again");
                    localStorage.clear();
                    navigate("/login");
                }
            }
        }

        fetchVideos();

        async function getChannel(){
            try{
                const res = await fetch(`http://localhost:5000/api/channel/${channelId}`, {
                    headers: {
                                'content-type': 'application/json',
                                'Authorization': token
                    }
                    });
                    const data = await res.json();

                    if(!res.ok){
                        throw new Error(`API Error: ${res.status}`);
                    }
                    setChannel(data.channel);
            }catch(error){
                console.error("Failed to load video", error)
                if (error.response?.status === 401) {
                    alert("Session expired. Please login again");
                    localStorage.clear();
                    navigate("/login");
                }
            }
        }
        getChannel();

    }, [])

    const handleDelete = async(e, videoId ) =>{
        try {
            const res = await fetch(`http://localhost:5000/api/video/${videoId}`,{
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': token
                }

            });

            const data =  await res.json();
            window.location.reload();
            if(!res.ok){
                throw new Error(`API Error: ${res.status}`);
            }
        }catch(error){
            console.error("Failed to Delete video", error)
            if (error.response?.status === 401) {
                alert("Session expired. Please login again");
                localStorage.clear();
                navigate("/login");
        }
    }

    }

return (
  <>
    <div className="flex justify-center mt-5 ">
      <img src="..\src\assets\welcome.jpeg" className="w-280 h-40 ml-40 rounded-md shadow-md hover:scale-101" />
    </div>

    {channel ? (
      <div className="ml-65  mt-5">
        <h1 className="text-5xl font-bold my-2 pl-1 text-red-500 underline">{channel.channelName}</h1>
        <p className="p-2">{channel.channelDescription}</p>
        <p className="p-2">Welcome to my Channel</p>
      </div>
    ) : (
      <p className="text-center mt-10 text-gray-500">Loading channel info...</p>
    )}

    <ul className="grid grid-cols-3 mx-30 gap-7 ml-65 my-10">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <Link to={`/${video._id}`} >
                <li key={video._id} className="shadow-md rounded-lg bg-gray-100 hover:scale-105">
                      <img src={video.thumbnailUrl} alt={video.title || "Video thumbnail"} className="h-50 w-150" />
                      <div className="p-2">
                      <p className="font-bold">{video.title}</p>
                      <p>{video.channel.channelName}</p>
                      <p className="">{video.category}</p>
                      <div className="flex justify-between my-2">
                        <Link to={`/edit/${video._id}`}>
                        <button className="flex items-center bg-blue-500 text-white rounded hover:bg-blue-700 px-3 mr-2">
                        Edit<MdEdit className="ml-2 text-xl" />
                        </button>
                        </Link>
                        <button className="flex items-center bg-red-500 text-white rounded hover:bg-red-700 px-3" onClick={(e)=>handleDelete(e, video._id)}>
                        Delete <MdDeleteForever className="ml-2 text-xl" />
                        </button>
                        </div>
                      </div>
                </li>
              </Link>
            ))
          ) : (
            <li className="relative  w-screen h-screen justify-center align-middle text-red-500">No Videos to display</li>
          )}

    </ul>
  </>
);
}