import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaHistory,
  FaStopwatch,
  FaFire,
  FaArrowLeft
} from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineFeaturedPlayList, MdOutlineSubscriptions } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // State to control sidebar open/collapse
  const [open, setOpen] = useState(true);

  // Menu items array with title, icon, and optional path for routing
  const menus = [
    { title: "Home", path: "/", icon: <FaHome /> },
    { title: "History", icon: <FaHistory /> },
    { title: "Liked Videos", icon: <AiOutlineLike /> },
    { title: "Playlists", icon: <MdOutlineFeaturedPlayList /> },
    { title: "Watch Later", icon: <FaStopwatch /> },
    { title: "Trending", icon: <FaFire /> },
    { title: "Subscriptions", icon: <MdOutlineSubscriptions /> }
  ];

  return (
    <div
      className={`${open ? "w-[180px]" : "w-20"} bg-gray-100 duration-100 p-5 min-h-screen flex flex-col shadow-md`}
    >
      {/* Toggle button to open/collapse sidebar */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 text-xl items-center align-middle p-2"
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        {open ? <FaArrowLeft /> : <FaBars />}
      </button>

      <ul className="space-y-3">
        {menus.map((item, index) => (
          <li
            key={index}
            className="flex align-middle gap-3 text-sm hover:bg-gray-200 py-1 rounded cursor-pointer w-full"
          >
            {/* If a path exists, render a Link for navigation */}
            {item.path ? (
              <Link
                to={item.path}
                className="flex items-center gap-3 align-middle p-2"
              >
                <span className="text-lg">{item.icon}</span>
                {open && <span className="duration-300">{item.title}</span>}
              </Link>
            ) : (
              // Otherwise, just render a div with icon and title
              <div className="flex items-center gap-3 align-middle p-2">
                <span className="text-lg">{item.icon}</span>
                {open && <span>{item.title}</span>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
