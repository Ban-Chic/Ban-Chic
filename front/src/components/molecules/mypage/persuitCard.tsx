import styled from "styled-components";
import { ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";
import PursuitMap, { PursuitName } from "../../../utils/PursuitMap";

interface Props {
  children: ReactNode;
  data: Array<number>;
}

function PersuitCard({ children, data }: Props) {
  const controls = useDragControls();
  return (
    <>
      {children}
      <SContainer>
        {data?.map((item, i) => (
          <SFBlock key={i} drag={true} $type={item} dragControls={controls}>
            <SType>{PursuitName[item]}</SType>
          </SFBlock>
        ))}
      </SContainer>
    </>
  );
}

const SType = styled.div`
  position: absolute;
  width: 100%;
  bottom: -20%;
  left: 50%;
`;

const SFBlock = styled(motion.div)<{ $type: number }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => PursuitMap[props.$type]});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`;

const SContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

export default PersuitCard;
