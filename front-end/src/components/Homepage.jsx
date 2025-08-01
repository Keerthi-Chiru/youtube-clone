import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function HomePage() {
  const [allVideos, setAllVideos] = useState();
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState();

  const { searchQuery } = useOutletContext();

  useEffect(()=>{
    async function fetchVideos(){
      try {
        const res = await fetch("http://localhost:5000/api/video", {
                headers: { 
                    'content-type': 'application/json',
                }
        } );
        const data = await res.json();
        console.log(data);
        if(res){
          console.log(category);
          if(category=="All"){
          setAllVideos(data.videos)
          } else{
            setAllVideos(data.filter(item => item.category == category))
          }

        }else{
          console.warn("No videos found")
        }
      } catch(error){
        console.error("Failed to load channels", error.response?.data || error.message)
        alert("Error: " +error.message);
      }
    }
    fetchVideos();
  },[])
  useEffect(() => {
    if (category === "All") {
      setVideos(allVideos);
    } else {
      setVideos(allVideos.filter((item) => item.category === category));
    }
    if(searchQuery.trim()){
      setVideos(allVideos.filter((item)=> item.title.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }, [category, searchQuery, allVideos]);

  return (
    <>
        <div className="mx-70 flex gap-7 mt-5">
          <button onClick={()=>setCategory('All')} className="shadow-md  px-2 bg-gray-200 cursor-pointer border-1 focus:bg-gray-300 rounded-md">All</button>
          <button onClick={()=>setCategory('Short Movie')} className="shadow-md  px-2 bg-gray-200 cursor-pointer border-1 focus:bg-gray-300 rounded-md">Short Movie</button>
          <button onClick={()=>setCategory('Short Video')} className="shadow-md  px-2 bg-gray-200 cursor-pointer border-1 focus:bg-gray-300 rounded-md">Short Video</button>
          <button onClick={()=>setCategory('Album Song')} className="shadow-md  px-2 bg-gray-200 cursor-pointer border-1 focus:bg-gray-300 rounded-md">Album Song</button>
        </div>
        <ul className="grid grid-cols-3 mx-30 gap-7 ml-70 my-10">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <Link to={`/${video._id}`}>
                <li key={video._id} className="shadow-md rounded-lg bg-gray-100 hover:scale-105">
                      <img src={video.thumbnailUrl} alt={video.title || "Video thumbnail"} className="h-50 w-150" />
                      <div className="p-2">
                      <p className="font-bold">{video.title}</p>
                      <p>{video.channel.channelName}</p>
                      <p className="">{video.category}</p>
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
