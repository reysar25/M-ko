import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import "./index.css"

const router = createBrowserRouter(routes)
const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
  <RouterProvider router={router}/>
);
