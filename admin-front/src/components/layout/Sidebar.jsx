import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Orders", path: "/orders" },
  { name: "Users", path: "/users" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#030712] border-r border-gray-800 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        MiniTech
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-sm text-gray-500">
        Admin Panel
      </div>
    </div>
  );
}