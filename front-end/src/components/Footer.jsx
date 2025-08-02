import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 border-t bottom-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        {/* Copyright text */}
        <div className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} <span className="font-bold text-red-500">MyTube</span>. All rights reserved.
        </div>

        {/* Footer navigation links */}
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-red-500 transition duration-150">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-red-500 transition duration-150">Terms of Service</Link>
          <Link to="/contact" className="hover:text-red-500 transition duration-150">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
