import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faXmark,
  faBarsStaggered,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const storedToken = localStorage.getItem("token");
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const navigate = useNavigate();
  let Links = [
    { name: "HOME", link: "/" },
    { name: "FILES", link: "/filelist" },
  ];

  let [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setDropDownMenu(false);
    navigate("/");
  };

  return (
    <div className="fixed  left-0 top-0 z-10 w-full shadow-md">
      <div className="items-center justify-between bg-slate-700 px-7 py-4 md:flex md:px-10">
        {/* logo section */}
        <Link
          to={"/"}
          className="flex cursor-pointer text-white items-center gap-1 text-2xl font-bold"
        >
          <span>FileShare</span>
        </Link>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 h-7 w-7 cursor-pointer md:hidden"
        >
          {open ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBarsStaggered} />
          )}
        </div>
        {/* linke items */}
        <ul
          className={`absolute left-0 z-[-1] w-full pb-12 pl-9 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="my-7 font-semibold md:my-0 md:ml-8">
              <a
                href={link.link}
                className="text-white duration-500 hover:text-orange-400"
              >
                {link.name}
              </a>
            </li>
          ))}
          {storedToken ? (
            <>
              <div
                onClick={() => setDropDownMenu(!dropDownMenu)}
                className="nav-link cursor-pointer hover:text-orange-500 md:ml-10"
              >
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
              </div>
              {dropDownMenu && (
                <ul className="absolute mt-2 w-28 rounded-lg bg-white shadow-md md:right-[40px] md:top-[60px]">
                  <li className="px-4 py-2">
                    <button onClick={handleLogout} className="text-gray-800">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <Link
              to="/signup"
              className="btn rounded bg-orange-500 px-3 py-1 font-semibold text-white duration-500 hover:bg-orange-700 md:static md:ml-8"
            >
              Sign Up
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
