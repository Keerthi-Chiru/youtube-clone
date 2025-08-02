import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  // State to hold current search query for video filtering
  const [searchQuery, setSearchQuery] = useState("");

  // Get user data from localStorage on initial load (string or null)
  const loginData = localStorage.getItem("user");

  // State to hold current user info (string or null)
  const [user, setUser] = useState(loginData);

  return (
    <div>
      {/* Header with search query and user info */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />

      <div className="flex min-h-screen">
        {/* Sidebar fixed on the left */}
        <div className="fixed z-50">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 bg-gray-100 w-screen">
          {/* Outlet renders matched child routes; passes searchQuery through context */}
          <Outlet context={{ searchQuery }} />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
