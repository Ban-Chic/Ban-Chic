import styled from "styled-components";
import { SBody1, SSubTitle, STitle } from "../../../styles/Font";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import theme from "../../../styles/Theme";

interface Props {
  data: {
    data: {
      image: string;
      nickname: string;
      email: string;
    };
  };
  updateProfileImage: () => void;
  onInput: React.ChangeEventHandler<HTMLInputElement>;
}

function ProfileCard({ data, onInput, updateProfileImage }: Props) {
  // 이미지 미리보기 URL을 상태로 관리합니다.
  const [previewUrl, setPreviewUrl] = useState(data.data?.image || "/user.svg");
  const [temp, setTemp] = useState(false);
  // 파일 인풋 참조를 생성합니다.
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateClick = () => {
    setTemp(false);
    updateProfileImage();
  };

  const handleCancleClick = () => {
    setTemp(false);
    setPreviewUrl(data.data?.image || "/user.svg");
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl); // 미리보기 URL 상태 업데이트
      onInput(event); // 부모 컴포넌트로 이벤트 전달
      setTemp(true);
    }
  };

  return (
    <SFlexCenter>
      <SSubTitle>내 정보</SSubTitle>
      <SProfile onClick={handleProfileClick} $imageurl={previewUrl} />
      <SInput
        ref={fileInputRef}
        type="file"
        id="profileImg"
        accept="image/jpeg, image/png"
        onInput={onInput}
        onChange={handleFileChange}
      />
      {temp && (
        <>
          <SButton
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: 100, y: 100 }}
            type="submit"
            onClick={() => handleUpdateClick()}
          >
            변경
          </SButton>
          <SCButton
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: -100, y: 100 }}
            type="submit"
            onClick={() => handleCancleClick()}
          >
            취소
          </SCButton>
        </>
      )}
      {data.data?.nickname && <STitle>{data?.data?.nickname}</STitle>}
      {data.data?.email && <SBody1>{data?.data?.email}</SBody1>}
    </SFlexCenter>
  );
}

const SCButton = styled(motion.button)`
  position: absolute;
  padding: 0.5em 1em;
  background-color: ${theme.color.errorColor};
  border-radius: 5px;
`;

const SButton = styled(motion.button)`
  position: absolute;
  padding: 0.5em 1em;
  background-color: ${theme.color.actionColor};
  border-radius: 5px;
`;

const SInput = styled.input`
  display: none;
`;

const SFlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

const SProfile = styled.div<{ $imageurl: string }>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: var(--color-white);
  background-image: url(${(props) => props.$imageurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(0.5px);
  border: 5px solid #f2f2f2;
  cursor: pointer;
`;

export default ProfileCard;
