import styled from "styled-components";
import { SBody1, SSubTitle, STitle } from "../../../styles/Font";

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
  return (
    <SFlexCenter>
      <SSubTitle>내 정보</SSubTitle>
      <SProfile
        $imageurl={data.data?.image ? data?.data?.image : "/user.svg"}
      />
      <SInput
        type="file"
        id="profileImg"
        accept="image/jpeg, image/png"
        onInput={onInput}
      />
      <button type="submit" onClick={updateProfileImage}>
        제출
      </button>
      {data.data?.nickname && <STitle>{data?.data?.nickname}</STitle>}
      {data.data?.email && <SBody1>{data?.data?.email}</SBody1>}
    </SFlexCenter>
  );
}

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
`;

export default ProfileCard;
