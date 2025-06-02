import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar({ isLoggedIn }) {
  const location = useLocation();

 

  const getAuthLink = () => {
    if (location.pathname === "/login") {
      return { text: "Log In", path: "/login" };
    } else if (location.pathname === "/register") {
      return { text: "Sign Up", path: "/login" };
    } else {
      return { text: "Log In", path: "/login" };
    }
  };

  const authLink = getAuthLink();

  

  return (
    <div
      className="bg-blue-400 text-black w-full flex justify-center gap-6 py-4 px-6 shadow sticky top-0 z-50 items-center"
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "mx-2 font-bold underline decoration-2 underline-offset-4"
            : "mx-2 hover:text-gray-800 transition-colors"
        }
        end
      >
        Home
      </NavLink>

      <NavLink
        to="/Wishlist"
        className={({ isActive }) =>
          isActive
            ? "mx-2 font-bold underline decoration-2 underline-offset-4"
            : "mx-2 hover:text-gray-800 transition-colors"
        }
        end
      >
        Wishlist
      </NavLink>

      <NavLink
        to="/grooveRater"
        className={({ isActive }) =>
          isActive
            ? "mx-2 font-bold underline decoration-2 underline-offset-4"
            : "mx-2 hover:text-gray-800 transition-colors"
        }
        end
      >
        Groove Rater
      </NavLink>
      <NavLink
        to="/add-event"
        className={({ isActive }) =>
          isActive
            ? "mx-2 font-bold underline decoration-2 underline-offset-4"
            : "mx-2 hover:text-gray-800 transition-colors"
        }
        end
      >
        Add Your Event
      </NavLink>

      <NavLink
        to={authLink.path}
        className={({ isActive }) =>
          isActive
            ? "mx-2 font-bold underline decoration-2 underline-offset-4"
            : "mx-2 hover:text-gray-800 transition-colors"
        }
        end
      >
        {authLink.text}
      </NavLink>
    </div>
  );
}

export default Navbar;
