import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Channels() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        channelName:"",
        description:""
    })
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function fetchChannels() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/channel", {
          headers: {
            'content-type': 'application/json',
            'Authorization': token,
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
          alert("Session expired. Please login again");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    fetchChannels();
  }, []);
  function handleChange(e) {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e, close) => {
    try{
        e.preventDefault(); 
        const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/channel", {
        method: "POST",
          headers: {
            'content-type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formData)

    });
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message)
    }
    alert("Channel created successfully");
    setFormData({ channelName: "", description: "" });
    close();
    window.location.reload();

  } catch (err){
    alert("Error: " + err.message);
  }
}

const handleDelete = async (e, channelId) => {
    e.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/channel/${channelId}`, {
            method:"DELETE",
          headers: {
            'content-type': 'application/json',
            'Authorization': token,
          },
        })
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message);
        }
        alert("Channel deleted successfully");
        window.location.reload();
    }catch(error){
        alert("Error: " + error.message);
    }

}

  const handleView = (e, channelId)=>{
    e.preventDefault();
    navigate(`/channel/${channelId}`);

  }


  return (
    <>
      <h2 className="text-2xl font-bold mb-6 mt-10 text-red-500 text-center">Your Channels</h2>

      <div className="sm:flex sm:flex-col items-center gap-6 md:px-10 text-sm md:ml-20 lg:ml-0">
        {channels.map((channel) => (
          <div key={channel._id} className="w-full max-w-3xl border p-4 rounded shadow-md bg-white flex justify-between">
            <div>
              <h3 className="font-semibold text-lg">{channel.channelName}</h3>
              <p>{channel.channelDescription}</p>
            </div>
            <div className="sm:flex sm:flex-col  items-center gap-2">
              <div className="font-bold">{`Total Videos: ${channel.videos.length}`}</div>
              <div className="flex gap-4 h-10">
                <button className="flex items-center bg-red-500 text-white rounded hover:bg-red-700 px-3" onClick={(e)=> handleView(e, channel._id)}>
                  View <GrFormView className="ml-2 sm:text-xl" />
                </button>
                <button className="flex items-center bg-red-500 text-white rounded hover:bg-red-700 px-3" onClick={(e)=>handleDelete(e, channel._id)}>
                  Delete <MdDeleteForever className="ml-2 sm:text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <Popup
          trigger={
            <button className="text-white bg-red-500 hover:bg-red-700 flex gap-2 items-center p-2 shadow-md rounded">
              Create new channel <FaSquarePlus />
            </button>
          }
          modal
          nested
        >
          { (close) =>  (
            <div className="p-6  rounded  ">
              <h2 className="text-2xl font-bold text-red-500 mb-4 mx-60">Create new channel</h2>
              <form className="flex flex-col px-20" onSubmit={(e)=>handleSubmit(e,close)}>
                            <input
                                type="text"
                                name="channelName"
                                placeholder="Channel Name"
                                onChange={handleChange}
                                required
                                value={formData.channelName}
                                className="mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
                                                        <input
                                type="text"
                                name="description"
                                placeholder="Channel Description"
                                onChange={handleChange}
                                required
                                value={formData.description}
                                className=" mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
              <button

                type="submit"
                className="mt-4 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded w-50 mx-auto"
              >
                Create Channel
              </button>
                
              </form>

            </div>
          )}
        </Popup>
      </div>
    </>
  );
}
