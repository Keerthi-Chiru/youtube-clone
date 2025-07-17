import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <div>
    <Header />
    <div className="flex min-h-screen ">
      <div className="fixed z-50">
      <Sidebar />
      </div>
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
    </div>
  );
}

export default App;
