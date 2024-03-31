import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// 페이지 URL
import Page_Url from "./Url";

//레이아웃
import Layouts from "../layouts/layouts";
import LayoutsWithoutHF from "../layouts/layoutsWithoutHF";

// 페이지
import LandingPage from "../components/pages/landing";
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";
import MyPage from "../components/pages/mypage";
import PerfumeDetailPage from "../components/pages/perfumeDetail/indexcopy";
import MainSample from "../components/pages/mainSample/mainSample";
import RecommendPage from "../components/pages/recommend";
import NaverCallback from "../components/pages/login/NaverCallback";
import KakaoCallback from "../components/pages/login/KakaoCallback";
import LoginPage from "../components/pages/login";
import MapPage from "../components/pages/map";
// import ReviewPage from "../components/pages/review/review";
// import CRUDTest from "../components/pages/crudTest";
// import ReviewModify from "../components/pages/review/reviewModify";
import SurveySelectPage from "../components/pages/survey/surveyselect";
import SurveyLandingPage from "../components/pages/survey/surveyLanding";
import SurveyImagePage from "../components/pages/survey/surveyImage";
import SurveyQuestionPage from "../components/pages/survey/surveyQuestion";

function Router() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path={Page_Url.Landing} element={<LandingPage />}></Route>
        <Route element={<Layouts />} errorElement={<ErrorPage />}>
          <Route path={Page_Url.Main} element={<MainPage />}></Route>
          <Route
            path={Page_Url.PerfumeDetail + ":perfumeId"}
            element={<PerfumeDetailPage />}
          ></Route>
          <Route path="/mainSample" element={<MainSample />}></Route>
          <Route path={Page_Url.Login} element={<LoginPage />}></Route>
          {/* <Route
            path="/perfumes/:perfumeId/reviews/:reviewId"
            element={<ReviewModify />}
          ></Route>
          <Route path="/perfumes/review/crud" element={<CRUDTest />}></Route> */}
          {/* <Route
            path="/perfumes/:perfumeId/reviews"
            element={<ReviewPage />}
          ></Route> */}
        </Route>
        <Route element={<LayoutsWithoutHF />} errorElement={<ErrorPage />}>
          <Route path={Page_Url.My} element={<MyPage />}></Route>
          <Route path={Page_Url.Recommend} element={<RecommendPage />}></Route>
          <Route path={Page_Url.Map} element={<MapPage />}></Route>
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
