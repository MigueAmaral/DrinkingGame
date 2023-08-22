import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Recipes from "./Recipes.jsx";
import Login from "./auth/login.jsx";
import { DrinksProvider } from "./DrinksProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <DrinksProvider><App /> </DrinksProvider>,
  },
  {
    path: "/recipes",
    element: 
    <DrinksProvider>
      <Recipes />
      </DrinksProvider>,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
