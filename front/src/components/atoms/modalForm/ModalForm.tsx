import styled from "styled-components";
import { SSubTitle } from "../../../styles/Font";
import ButtonComponent from "../auth/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import theme from "../../../styles/Theme";

type Props = {
  title?: string;
  alert?: string;
  closeModal: () => void;
  actionModal?: (rate:number, content: string) => void;
};
const ModalForm = ({ title, alert = "", closeModal, actionModal }: Props) => {
  // const [data, setData] = useState<string>(alert);
  const [rate, setRate] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const ChangeBtn = () => {
    const rateValue = parseInt(rate as any);
    if (rateValue >= 1 && rateValue <= 5 && content.length >= 2 && content.length <= 500 && /^[가-힣a-z0-9-_ ]+$/i.test(content)) {
      actionModal?.(rateValue, content);
      window.alert("리뷰 등록이 완료되었습니다.");
      closeModal();
    } else {
      window.alert("평점은 1-5점 사이, 내용은 특수문자 없이 2-500자로 작성 가능합니다.");
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent) => {
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
          id="rateValue"
          type="number"
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRate(parseInt(event.target.value));
          }}
          defaultValue={alert}
          placeholder="평점을 입력하세요(1-5)"
          max={5}
          min={1}
          onKeyPress={handleOnKeyPress}
          autoFocus
          required
        />
        <SInput
          id="contentValue"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
          }}
          defaultValue={alert}
          placeholder="리뷰 내용을 입력하세요"
          maxLength={500}
          minLength={2}
          onKeyPress={handleOnKeyPress}
          required
        />
        <SFlexWrap>
          <ButtonComponent onClick={closeModal}>취소</ButtonComponent>
          <ButtonComponent onClick={ChangeBtn}>등록</ButtonComponent>
        </SFlexWrap>
      </SModalContainer>
    </SModalWrap>
  );
};

export default ModalForm;

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
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SInput = styled(motion.input)`
width: 500px;
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
