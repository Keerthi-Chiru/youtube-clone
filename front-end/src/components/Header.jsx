import { Link } from "react-router-dom";
import { FaYoutube} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrChannel } from "react-icons/gr";
import { IoLogIn } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";




export default function Header(){
    let navigate = useNavigate();
    let users = localStorage.getItem("user")
    


    function handleLogout(){
        localStorage.removeItem("user");
    }

    return(
        <>
            <navbar className="flex sticky top-0 z-50 h-20 items-center bg-gray-100 shadow-md p-3  justify-between ">
                    <Link to="/" className="flex md:text-4xl font-[logo] text-red-500 hover:scale-105 text-xl">
                        <p>MyTube</p>
                        <div className="text-4xl"><FaYoutube /></div>
                    </Link>
                    <div className="items-center hidden md:flex gap-3 ">
                    <input type="text" className="border-1 rounded-xl w-75 focus:bg-gray-200  p-1"></input>
                    <button className="text-xl hover:scale-105"><FaMagnifyingGlass /></button>
                    </div>
                    <div className="flex gap-10 pr-10 font-bold text-lg ">
                    <Link to='/channels' className="hover:scale-105 flex items-center gap-1">Channel<div><GrChannel /></div></Link>
                    {
                        (users) ? (<>
                            <Link to="/upload" className="hover:scale-105 flex items-center gap-1 ">Upload<div><MdOutlineFileUpload /></div></Link>
                            <Link  className="hover:scale-105 flex items-center gap-1" onClick={handleLogout}>Logout<div className="text-2xl"><IoLogOut /></div></Link>
                        </>):(<>
                            <Link to="/login" className="hover:scale-105 flex items-center gap-1">Login<div className="text-2xl"><IoLogIn /></div></Link>
                        </>)
                    }
                    
                    </div>
            </navbar>
        </>
    );
}