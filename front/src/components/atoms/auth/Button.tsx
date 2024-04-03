import { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";

interface IButtonProps {
  children: ReactNode;
  onClick?: () => void;
  on?: void;
  color?: string;
}

function ButtonComponent({
  children,
  onClick,
  color = theme.color.clearBlockColor,
}: IButtonProps) {
  return (
    <SButton onClick={onClick} $color={color}>
      {children}
    </SButton>
  );
}

const SButton = styled.button<{ $color: string }>`
  width: 100%;
  height: 100%;
  color: ${theme.color.fontColor};
  background-color: ${(props) => props.$color};
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(0.5px);
  border: 2px solid #e2e2e2;
  border-radius: 5px;
`;

export default ButtonComponent;
