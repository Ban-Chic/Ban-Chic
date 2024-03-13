import { createBrowserRouter } from "react-router-dom";
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);

export default Router;
