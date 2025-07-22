import { useState, useEffect } from "react";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

export default function Channels() {
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
        console.log(data)
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

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 ml-50 mt-15 text-red-500 ">Your Channels</h2>
      {channels.map((channel) => (
        <div key={channel._id} className="border p-4 mb-2 rounded shadow-md bg-white mx-50 flex justify-between px-10">
            <div>
          <h3 className="font-semibold text-lg">{channel.channelName}</h3>
          <p>{channel.channelDescription}</p>
          </div>
          <div>{`Total Videos: ${channel.videos.length}`}</div>
          <div className="flex gap-4 h-10">
            <button className="flex items-center bg-red-500 text-white  rounded hover:bg-red-700 px-2 ">View<GrFormView className="text-2xl" /></button>
            <button className="flex items-center bg-red-500 text-white  rounded hover:bg-red-700 px-2 ">Delete<MdDeleteForever className="text-xl" /></button>
          </div>
        </div>
      ))}
    </>
  );
}
