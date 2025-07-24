import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
