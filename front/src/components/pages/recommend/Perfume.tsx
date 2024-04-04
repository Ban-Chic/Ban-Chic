import { MouseEventHandler } from "react";
import styled from "styled-components";

type perfumeProps = {
  select: string;
  click: MouseEventHandler;
  children: any;
};

function Perfume({ children, select, click }: perfumeProps) {
  return (
    <SLi onClick={click} $selected={select === children}>
      {children}
    </SLi>
  );
}

const SLi = styled.li<{ $selected: boolean }>`
  /* background-color: red; */
  padding: 0 10px;
  border-radius: 5px;
  border: ${(props) =>
    props.$selected ? "solid 2px green" : "solid 2px white;"};
  color: ${(props) => (props.$selected ? "green" : "")};
  cursor: pointer;
  font-weight: ${(props) => props.$selected && "bold"};
`;

export default Perfume;
