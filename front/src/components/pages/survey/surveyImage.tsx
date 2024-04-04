import { motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { ImgAPI } from "../../../api/Config";
import { useNavigate } from "react-router";
import Page_Url from "../../../router/Url";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function SurveyImagePage() {
  // 이미지 미리보기 URL을 상태로 관리합니다.
  const [previewUrl, setPreviewUrl] = useState("");
  const [unisex, setUnisex] = useState("");
  const [files, setFiles] = useState<FileList | null>();
  // 파일 인풋 참조를 생성합니다.
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };
  const [activeButton, setActiveButton] = useState("");
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMale = () => {
    setUnisex("M");
    setActiveButton("M"); // 남성 버튼을 활성화
  };
  const handleFemale = () => {
    setUnisex("F");
    setActiveButton("F"); // 여성 버튼을 활성화
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl); // 미리보기 URL 상태 업데이트
      if (file) setFiles(event.target.files);
    }
  };

  const handleSubmit = () => {
    setLoad(true);
    const formData = new FormData();
    if (files) formData.append("file", files[0]);
    ImgAPI.post(`members/recommend/image`, formData)
      .then((res) => {
        navigate(Page_Url.SurveyImageResult, {
          state: {
            fashion: res.data.data.fashion,
            perfumeData: res.data.data.perfumeOverviewResList,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {load && (
        <SAb>
          <LoadingSpinner />
        </SAb>
      )}
      <SFContainer
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
        }}
      >
        <SView fileUrl={previewUrl} onClick={handlePictureClick}></SView>
        <SInput
          ref={fileInputRef}
          type="file"
          id="profileImg"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        ></SInput>
        {previewUrl && (
          <span>
            <SButton isActive={activeButton === "M"} onClick={handleMale}>
              Male (남성)
            </SButton>
            <SButton isActive={activeButton === "F"} onClick={handleFemale}>
              Female (여성)
            </SButton>
          </span>
        )}
        {unisex && (
          <SButton
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
            }}
            style={{ backgroundColor: theme.color.actionColor }}
            onClick={handleSubmit}
          >
            어울리는 향수 추천받기
          </SButton>
        )}
      </SFContainer>
    </>
  );
}

const SAb = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

const SButton = styled(motion.button)<{ isActive?: boolean }>`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isActive
      ? theme.color.primaryColor
      : "gray"}; // 활성화 상태에 따라 색상 변경
  border-radius: 5px;
  margin: 3px;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SInput = styled.input`
  display: none;
`;

const contentString = (fileUrl: string) =>
  fileUrl
    ? "사진은 저장되지 않고,\n결과 도출 후 즉시 폐기됩니다."
    : "나의 패션스타일을 분석하고 어울리는 향수를 추천받아보세요.\n업로드한 사진은 기록이 남지 않습니다.";

const SView = styled.article<{ fileUrl: string }>`
  width: 300px;
  height: 500px;
  cursor: pointer;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid #e2e2e2;
  background-image: url(${(props) => props.fileUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  &:hover::after {
    content: "${(props) => contentString(props.fileUrl).replace(/\n/g, "\\A")}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: pre;
    background-color: #f2f2f2;
    color: black;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8em;
  }
`;

const SFContainer = styled(motion.section)`
  width: 100vw;
  height: 100vh;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export default SurveyImagePage;
