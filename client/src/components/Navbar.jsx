import React from "react";
import { Person, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className=" w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
    <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 text-gray-800">
          <Menu />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Hotel Management System</h1>
    </div>
    <div className="md:flex md:items-center md:space-x-6">
          <button>
            {!user ? (
              <Person sx={{ color: "#0C4670" }} style={{ fontSize: 40 }} />
            ) : (
              <img
                src={`http://localhost:8000/${user.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="profile photo"
                className="object-cover rounded-full h-12 w-12"
              />
            )}
          </button>
        </div>
    </div>
  );
};

export default Navbar;
