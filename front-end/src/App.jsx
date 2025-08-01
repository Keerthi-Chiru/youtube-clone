import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const loginData = localStorage.getItem("user");
  const [user, setUser] = useState(loginData);


  return (
    <div>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />
    <div className="flex min-h-screen ">
      <div className="fixed z-50">
      <Sidebar />
      </div>
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
    </div>
  );
}

export default App;
