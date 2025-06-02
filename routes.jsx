import App from "./src/App";
import ErrorPage from "./src/Pages/ErrorPage";
import GrooveRater from "./src/Pages/GrooveRater";
import HomePage from "./src/Pages/HomePage"
import LogIn from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import WishlistPage from "./src/Pages/WishlistPage";
import AddEventPage from "./src/Pages/AddEvent";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/",
                element:<HomePage />
            },
            {
                path: "/Wishlist",
                element:<WishlistPage/>
            },
            {
                path: "/register",
                element:<Register />
            },
            {
                path: "/login",
                element:<LogIn />
            },
            {
                path: "/grooveRater",
                element: <GrooveRater />
                
            },
            {
                path: "add-event",
                element: <AddEventPage />
            }
            
        ]
    }
]

export default routes;