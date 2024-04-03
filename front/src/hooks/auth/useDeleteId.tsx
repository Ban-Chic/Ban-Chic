import { useNavigate } from "react-router";
import { deleteMember } from "../../api/Api";
import Page_Url from "../../router/Url";

function useDeleteId() {
  const navigate = useNavigate();
  const deleteId = () => {
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!isConfirmed) {
      return;
    }

    deleteMember().then(() => {
      localStorage.removeItem("oauthProvider");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("visitedPerfumes");
    localStorage.removeItem("nickname");
      navigate(Page_Url.Landing);
    });
  };
  return deleteId;
}

export default useDeleteId;
