import styled from "styled-components";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const MenuToggle = ({ isOpen, toggle }: Props) => (
  <SToggleButton onClick={toggle}>
    <svg width="20" height="20" viewBox="0 0 23 19">
      <SPath d={!isOpen ? "M 2 2.5 L 20 2.5" : "M 3 16.5 L 17 2.5"} />
      <SPath d="M 2 9.423 L 20 9.423" style={{ opacity: !isOpen ? 1 : 0 }} />
      <SPath d={!isOpen ? "M 2 16.346 L 20 16.346" : "M 3 2.5 L 17 16.346"} />
    </svg>
  </SToggleButton>
);

const SPath = styled.path`
  fill: transparent;
  stroke-width: 3;
  stroke: white;
  stroke-linecap: round;
  transition: all 0.3s ease;
`;

const SToggleButton = styled.button`
  outline: none;
  border: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  position: fixed;
  float: right;
  z-index: 60;
  top: 1.5vh;
  right: 3vw;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191919;
`;
export default MenuToggle;
