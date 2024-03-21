import styled from "styled-components";
import color from "./Color";

const font = {
  Title: `
      font-family: Pretendard;
      font-size: 24px;
      font-style: semiBold;
      font-weight: 600;`,
  SubTitle: `
      font-family: Pretendard;
      font-size: 18px;
      font-style: semiBold;
      font-weight: 600;`,
  Body1: `
      font-family: Pretendard;
      font-size: 14px;
      font-style: Regular;
      font-weight: 400;`,
  Body2: `
      font-family: Pretendard;
      font-size: 12px;
      font-style: Regular;
      font-weight: 400;`,
};

export const SBody2 = styled.h1`
  ${font.Body2}
  color: ${color.fontColor};
`;

export const SBody1 = styled.h1`
  ${font.Body1}
  color: ${color.fontColor};
`;

export const SSubTitle = styled.h1`
  ${font.SubTitle}
  color: ${color.fontColor};
`;

export const STitle = styled.h1`
  ${font.Title};
  color: ${color.fontColor};
`;

export default font;
