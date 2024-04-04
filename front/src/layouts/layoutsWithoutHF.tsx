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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    position: relative;
    min-height: 100vh;
  }
  &:nth-child(1) > :nth-child(1) {
    position: relative;
    width: 100%;
  }
`;

export default LayoutsWithoutHF;
