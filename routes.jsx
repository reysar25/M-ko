import App from "./src/App";
import ErrorPage from "./src/Pages/ErrorPage";
import HomePage from "./src/Pages/HomePage"
import LogIn from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import WishlistPage from "./src/Pages/WishlistPage";

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
            }
            
        ]
    }
]

export default routes;