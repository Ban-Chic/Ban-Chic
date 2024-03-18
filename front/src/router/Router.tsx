import { createBrowserRouter } from "react-router-dom";
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";
import MyPage from "../components/pages/mypage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
]);

export default Router;
