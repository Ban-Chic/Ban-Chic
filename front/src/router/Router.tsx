import { Route, Routes } from "react-router-dom";

//레이아웃
import Layouts from "../layouts";

// 페이지
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";
import MyPage from "../components/pages/mypage";
import LoginPage from "../components/pages/login";
import RecommendPage from "../components/pages/recommend";
import SurveyPage from "../components/pages/survey";

function Router() {
  return (
    <Routes>
      <Route element={<Layouts />} errorElement={<ErrorPage />}>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/recommend" element={<RecommendPage />}></Route>
        <Route path="/survey" element={<SurveyPage />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
