import { useEffect, useState } from "react"

export default function Upload(){
    const [formData, setFormData] = useState({
        title:"",
        videoUrl: "",
        thumbnailUrl:"",
        description:"",
        category:"",
        channelName:""
    })
    const [channels, setChannels] = useState([]);

    useEffect(()=>{
        async function fetchChannels() {
        const token = localStorage.getItem("token")
        try{
            const res = await fetch("http://localhost:5000/api/channel",{
                headers: { 
                    'content-type': 'application/json',
                    'Authorization': token,
                },
            })
            const data = await res.json();
            console.log(data);   

            if(res){
                setChannels(data.channels)
            }else{
                console.warn("No channels found for this user")
            }
        }catch(error){
            console.error("Failed to load channels", error.response?.data || error.message)
            if(error.response?.status == 401){
                alert("Session expired please login again");
                localStorage.clear();
                window.location.href = "/login"
            }
        }
            
        }
        fetchChannels();
    }, [])
        function handleChange(e){
            setFormData({...formData, [e.target.name]: e.target.value})
        }
        const handleUpload = async (e) => {
            e.preventDefault();
            const token = localStorage.getItem("token")
            try{
                const res = await fetch('http://localhost:5000/api/video/upload', {
                    method: "POST",
                headers: { 
                    'content-type': 'application/json',
                    'Authorization': token,
                },
                    body:JSON.stringify(formData)

                });
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.message)
                }
                alert("video uploaded successfully");
                setFormData({
                    title: "",
                    videoUrl:"",
                    thumbnailUrl:"",
                    description:"",
                    category:"",
                    channelName:""
                });
            } catch(error){
            if(error.response?.status == 401){
                alert("Session expired please login again");
                localStorage.clear();
                window.location.href = "/login"
            }            }
        }
            return (
                <>
                    <div className="mt-12 flex items-center justify-center bg-gray-100">
                        <form onSubmit={handleUpload} className="bg-white p-8 rounded shadow-md w-full  max-w-md">
                            <h1 className="text-2xl text-red-500 font-bold mb-6 text-center">Upload new video</h1>
                            <input
                                type="text"
                                name="title"
                                placeholder="Video Title"
                                onChange={handleChange}
                                required
                                value={formData.title}
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="videoUrl"
                                placeholder="Video URL"
                                onChange={handleChange}
                                value={formData.videoUrl}
                                required
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="thumbnailUrl"
                                placeholder="Video Thumbnail URL"
                                onChange={handleChange}
                                value={formData.thumbnailUrl}
                                required
                                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Video Description"
                                onChange={handleChange}
                                value={formData.description}
                                required
                                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Video Category"
                                onChange={handleChange}
                                value={formData.category}
                                required
                                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
                            />
                            <select name="channelName" onChange={handleChange} className="w-full mb-6 px-4 py-2 border border-gray-300 rounded" required>
                                <option value={formData.channelName}>Select Channel</option>
                                { (channels) ? (
                                    channels.map((channel) => {
                                        return <option value={channel.channelName} key={channel._id}>{channel.channelName}</option>
                                    })
                                ) : null
                                }
                            </select>
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700">
                                Upload
                            </button>
                        </form>
                        
                    </div>
                </>
            );

}