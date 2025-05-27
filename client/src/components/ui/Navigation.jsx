import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button"; // Assuming this is your custom Button component
import useAuthStore from "@/store/useAuthStore";

const Navigation = () => {
  // Your navigation links and logic here
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const onLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-950  shadow-2xl">
      {/* Brand */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">GPTSmart</Link>
      </div>

      {/* Profile and Logout */}
      <div className="flex items-center gap-2">
        {user && (
          <>
            {user.role !== "admin" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                <Link to="/user">{user.email[0].toUpperCase()}</Link>
              </div>
            )}
            <Button onClick={onLogout}>Logout</Button>{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;