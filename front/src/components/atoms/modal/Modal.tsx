import styled from "styled-components";
import { SSubTitle } from "../../../styles/Font";
import ButtonComponent from "../auth/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

import theme from "../../../styles/Theme";

type Props = {
  title?: string;
  alert?: string;
  closeModal: () => void;
  actionModal?: (nickname: string) => void;
};
const Modal = ({ title, alert = "", closeModal, actionModal }: Props) => {
  const [data, setData] = useState<string>(alert);

  const ChangeBtn = () => {
    if (/^[가-힣a-z0-9-_]{2,10}$/.test(data) && alert != data) {
      actionModal?.(data);
      closeModal();
    } else {
      toast("닉네임을 확인해주세요. 특수문자를 제외하고 2-10자로 설정가능합니다.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      ChangeBtn();
    }
  };

  return (
    <SModalWrap>
      <SModalBackGround onClick={closeModal} />
      <SModalContainer
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeIn",
          duration: 0.1,
        }}
      >
        <SSubTitle>{title}</SSubTitle>
        <SInput
          id="nameValue"
          type="text"
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            return setData(event.target.value);
          }}
          defaultValue={alert}
          placeholder={alert}
          maxLength={10}
          minLength={2}
          onKeyPress={handleOnKeyPress}
          autoFocus
          required
        />
        <SFlexWrap>
          <ButtonComponent onClick={closeModal} color={theme.color.errorColor}>
            취소
          </ButtonComponent>
          <ButtonComponent onClick={ChangeBtn} color={theme.color.actionColor}>
            변경
          </ButtonComponent>
        </SFlexWrap>
      </SModalContainer>
    </SModalWrap>
  );
};

export default Modal;

const SFlexWrap = styled.div`
  display: flex;
  gap: 1em;
  width: 10em;
  height: 2em;
`;

const SModalWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const SModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  /* @media only screen and (max-width: none;) {
    height: 100%;
  } */
`;

const SInput = styled(motion.input)`
  background-color: var(--color-white);
  border: 1px solid var(--color-white);
  outline: none;
  ${theme.font.Title}
  text-align: center;
`;

const SModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  gap: 2rem;
  padding: 3.6rem 0;
  border: 1px solid var(--color-white);
  background-color: var(--color-white);
  /* background-color: yellow; */
  position: absolute;
  right: 0;
  top: 20em;
  width: 100%;
`;
