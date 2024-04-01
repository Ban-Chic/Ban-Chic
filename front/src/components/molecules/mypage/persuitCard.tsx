import styled from "styled-components";
import { ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";

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
        {data?.map((item) => (
          <SFBlock drag={true} dragControls={controls}>
            {item}
          </SFBlock>
        ))}
      </SContainer>
    </>
  );
}

const SFBlock = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: yellow;
`;

const SContainer = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

export default PersuitCard;
