import { Link } from "react-router-dom";
import { FaYoutube} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrChannel } from "react-icons/gr";
import { IoLogIn } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function Header({ searchQuery, setSearchQuery}){
    let navigate = useNavigate();
    let users = JSON.parse(localStorage.getItem("user") || "null");
    const [search, setSearch] = useState("");
    console.log(users?.username)



    function handleLogout(){
        localStorage.clear();
    }
  function handleInputChange(e) {
    setSearch(e.target.value);
  }
    function handleSearch(e){
        setSearchQuery(search);
    }
    return(
        <>
            <navbar className="flex sticky top-0 z-50 h-20 items-center bg-gray-100 shadow-md p-3  justify-between ">
                    <Link to="/" className="flex md:text-4xl font-[logo] text-red-500 hover:scale-105 text-xl">
                        <p>MyTube</p>
                        <div className="text-4xl"><FaYoutube /></div>
                    </Link>
                    <div className="items-center hidden md:flex gap-3 ">
                    <input type="text" className="border-1 rounded-xl w-75 focus:bg-gray-200  p-1"  value={search} onChange={handleInputChange}></input>
                    <button className="text-xl hover:scale-105 cursor-pointer" onClick={handleSearch} ><FaMagnifyingGlass /></button>
                    </div>
                    <div className="flex sm:gap-10 gap-2 sm:pr-10 font-bold text-lg ">
                    
                    {
                        (users) ? (<>
                            <Link to="/upload" className="hover:scale-105 sm:flex items-center gap-1 text-sm sm:text-lg">Upload<div><MdOutlineFileUpload /></div></Link>
                            <Link to='/channels' className="hover:scale-105 sm:flex items-center text-sm sm:text-lg gap-1">Channel<div><GrChannel /></div></Link>
                            <div className="hover:scale-105 cursor-pointer text-sm sm:text-lg">Hi, {users?.username}<Link  className=" flex items-center gap-1" onClick={handleLogout}> Logout<p className="text-2xl"><IoLogOut /></p></Link></div>
                        </>):(<>
                            <Link to="/login" className="hover:scale-105 flex items-center gap-1">Login<div className="text-2xl"><IoLogIn /></div></Link>
                        </>)
                    }
                    
                    </div>
            </navbar>
        </>
    );
}