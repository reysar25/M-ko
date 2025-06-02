import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn}) {
  const location = useLocation();
  const navigate = useNavigate()

  const getAuthLink = () => {
    if (location.pathname === "/login") {
      return { text: "Sign Up", path: "/register" };
    } else if (location.pathname === "/register") {
      return { text: "Log In", path: "/login" };
    } else {
      return { text: "Log In", path: "/login" };
    }
  };
  const authLink = getAuthLink();

  const LogOut = () => {
    setIsLoggedIn(false)
    navigate("/login")
  }
  
  
  return (
    <div className="bg-blue-400 text-black w-full flex justify-center gap-6 py-4 px-6 shadow sticky top-0 z-50 items-center">
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
      
      {isLoggedIn ? (
        <>
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

          <button 
            onClick={() => { }}
            className="mx-2 hover:text-gray-800 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
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
      )}
    </div>
  );
}

export default Navbar;