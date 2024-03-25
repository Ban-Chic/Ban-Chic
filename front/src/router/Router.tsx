import { Route, Routes } from "react-router-dom";

//레이아웃
import Layouts from "../layouts";

// 페이지
import MainPage from "../components/pages/main";
import ErrorPage from "../components/pages/error";
import MyPage from "../components/pages/mypage";
import PerfumeDetailPage from "../components/pages/perfumeDetail";
import MainSample from "../components/pages/mainSample/mainSample";
import GPTSample from "../components/molecules/gptApi/gptSample";

function Router() {
  return (
    <Routes>
      <Route element={<Layouts />} errorElement={<ErrorPage />}>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/perfumeId" element={<PerfumeDetailPage />}></Route>
        <Route path="/mainSample" element={<MainSample />}></Route>
        <Route path="/gptSample" element={<GPTSample />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
