import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";




export default function Header(){
    return(
        <>
            <navbar className="flex sticky top-0 z-70 h-20 items-center bg-gray-100 shadow-md p-3  justify-between ">
                    <Link to="/" className="flex md:text-4xl font-[logo] text-red-700 hover:scale-105 text-xl">
                        <p>MyTube</p>
                        <div className="text-4xl"><FaYoutube /></div>
                    </Link>
                    <div className="items-center hidden md:block">
                    <input type="text" className="border-1 rounded-lg w-75 active:border-red-700"></input>
                    <button className="text-xl hover:scale-105">🔍</button>
                    </div>
                    <div className="flex gap-10 pr-10 font-bold text-lg ">
                    <div className="hover:scale-105">Channel</div>
                    <Link to="/login" className="hover:scale-105">Login</Link>
                    </div>
            </navbar>
        </>
    );
}