import styled from "styled-components";
import SideBar from "../components/molecules/common/gnb/sideBar";
import { Outlet } from "react-router";

function LayoutsWithoutHF() {
  return (
    <SLayout>
      <main>
        <Outlet />
      </main>
      <SideBar />
    </SLayout>
  );
}

const SLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    position: relative;
    min-height: 100vh;
  }
`;

export default LayoutsWithoutHF;
