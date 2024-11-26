import { NavLink } from "react-router-dom";
import { MenuItems } from "../types";
import { LuLayoutDashboard, LuUsers, LuMenu, LuX } from "react-icons/lu";
import { GoPasskeyFill } from "react-icons/go";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems: MenuItems[] = [
    { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard className="w-5 h-5" />, path: "/" },
    { id: "users", label: "Users", icon: <LuUsers className="w-5 h-5" />, path: "/users" },
    { id: "roles", label: "Roles", icon: <GoPasskeyFill className="w-5 h-5" />, path: "/roles" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed md:hidden top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 bg-gray-800 text-white h-screen
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-200 ease-in-out
          flex flex-col
        `}
      >
        <div className="flex items-center p-4 border-b border-gray-700">
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150
                ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span className="inline-flex items-center justify-center w-8">
                {item.icon}
              </span>
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center text-sm text-gray-400">
            <span>© 2024 Admin Panel</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
