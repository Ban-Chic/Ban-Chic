import { useNavigate } from "react-router";
import { deleteMember } from "../../api/Api";
import Page_Url from "../../router/Url";

function useDeleteId() {
  const navigate = useNavigate();
  const deleteId = () => {
    deleteMember().then(() => {
      localStorage.removeItem("oauthProvider");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("uid");
      navigate(Page_Url.Landing);
    });
  };
  return deleteId;
}

export default useDeleteId;
