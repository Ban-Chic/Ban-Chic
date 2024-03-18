import { ReactNode } from "react";
import styled from "styled-components";
import GNB, { SHeaderContainer } from "../components/molecules/common/gnb";
import Footer, {
  SFooterContainer,
} from "../components/molecules/common/footer";

interface Props {
  children: ReactNode;
}

function Layouts({ children }: Props) {
  return (
    <SLayout>
      <GNB />
      {children}
      <Footer />
    </SLayout>
  );
}

const SLayout = styled.div`
  width: 100%;

  &:nth-child(1) {
    position: relative;
    height: 100vh;
  }

  &:nth-child(1) > :nth-child(2) {
    min-height: calc(100vh - (244px));
  }
`;

export default Layouts;
