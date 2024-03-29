import styled from "styled-components";
import CircleItem from "../../atoms/item/circleItem";
import List from "../../atoms/list";
import { ReactNode } from "react";

interface IPerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
}

interface IProps {
  children: ReactNode;
  data: IPerfumeData[];
}

function CircleItemList({ children, data }: IProps) {
  return (
    <>
      <SContainer>
        {children}
        <List>
          {data.map((item, i) => (
            <CircleItem
              key={i}
              url={"/perfumes/" + item.id}
              $imageUrl={item.perfumeImg}
            ></CircleItem>
          ))}
        </List>
      </SContainer>
    </>
  );
}

const SContainer = styled.article`
  width: 100%;
  height: 100%;
`;

export default CircleItemList;
