import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// 페이지 URL
import Page_Url from "./Url";

//레이아웃
import Layouts from "../layouts/layouts";
import LayoutsWithoutHF from "../layouts/layoutsWithoutHF";
import LayoutsWithoutF from "../layouts/layoutsWithoutF";

// 페이지
import LandingPage from "../components/pages/landing";
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";
import MyPage from "../components/pages/mypage";
import PerfumeDetailPage from "../components/pages/perfumeDetail/indexcopy";
import RecommendPage from "../components/pages/recommend";
import NaverCallback from "../components/pages/login/NaverCallback";
import KakaoCallback from "../components/pages/login/KakaoCallback";
import LoginPage from "../components/pages/login";
import MapPage from "../components/pages/map";
import SurveySelectPage from "../components/pages/survey/surveyselect";
import SurveyLandingPage from "../components/pages/survey/surveyLanding";
import SurveyImagePage from "../components/pages/survey/surveyImage";
import SurveyQuestionPage from "../components/pages/survey/surveyQuestion";
import SurveyResultPage from "../components/pages/survey/surveyResult";
import SurveyImgResultPage from "../components/pages/survey/surveyResultImg";
import MainLoginPage from "../components/pages/main/mainLogin";
import MainSelect from "../components/pages/main/mainSelect";

function Router() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={Page_Url.Landing} element={<LandingPage />}></Route>

        <Route element={<Layouts />} errorElement={<ErrorPage />}>
          <Route path={Page_Url.Main} element={<MainSelect />}></Route>
          <Route
            path={Page_Url.PerfumeDetail + ":perfumeId"}
            element={<PerfumeDetailPage />}
          ></Route>
          <Route path={Page_Url.NoLogin} element={<MainPage />}></Route>
          <Route path={Page_Url.MainLogin} element={<MainLoginPage />}></Route>
          <Route path={Page_Url.Login} element={<LoginPage />}></Route>
          <Route path={Page_Url.Recommend} element={<RecommendPage />}></Route>
        </Route>

        <Route element={<LayoutsWithoutHF />} errorElement={<ErrorPage />}>
          <Route path={Page_Url.My} element={<MyPage />}></Route>
          <Route
            path={Page_Url.SurveyLanding}
            element={<SurveyLandingPage />}
          ></Route>
          <Route
            path={Page_Url.SurveyImage}
            element={<SurveyImagePage />}
          ></Route>
          <Route
            path={Page_Url.SurveySelect}
            element={<SurveySelectPage />}
          ></Route>
          <Route
            path={Page_Url.SurveySwipe}
            element={<SurveyQuestionPage />}
          ></Route>
          <Route
            path={Page_Url.SurveyResult}
            element={<SurveyResultPage />}
          ></Route>
          <Route
            path={Page_Url.SurveyImageResult}
            element={<SurveyImgResultPage />}
          ></Route>
        </Route>

        <Route element={<LayoutsWithoutF />} errorElement={<ErrorPage />}>
          <Route path={Page_Url.Map} element={<MapPage />}></Route>
        </Route>

        <Route
          path={Page_Url.NaverCallback}
          element={<NaverCallback />}
        ></Route>
        <Route
          path={Page_Url.KakaoCallback}
          element={<KakaoCallback />}
        ></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default Router;
