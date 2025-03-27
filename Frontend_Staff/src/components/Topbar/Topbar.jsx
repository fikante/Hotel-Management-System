import { useState } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { MdSettings, MdNotifications } from "react-icons/md";

const Topbar = ({ isSidebarOpen, user, currentNavItem }) => {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold font-serif">{currentNavItem}</h1>
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <MdNotifications
          className="cursor-pointer text-blue-500 hover:text-red-300"
          onClick={() => alert("You have no new notifications.")}
          aria-label="Notification-Bell-Button"
          size={20}
        />
        <MdSettings
          className="cursor-pointer text-gray-600 hover:text-gray-300"
          onClick={() => router.push("/settings")}
          aria-label="Settings-Button"
          size={20}
        />

        <div className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-full cursor-pointer">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser size={18} className="text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
