import styled from "styled-components";
import CircleItem from "../../atoms/item/circleItem";
import List from "../../atoms/list";
import { ReactNode } from "react";

interface IPerfumeData {
  perfumeId: number;
  imageUrl: string;
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
          {data.map((item) => (
            <CircleItem
              url={"/perfumes/" + item.perfumeId}
              $imageUrl={item.imageUrl}
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
