import styled from "styled-components";

const SImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  padding: 10px;

  position: absolute;
  right: 15px;
  bottom: 25px;
  z-index: 2;
  cursor: pointer;

  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
`;
const MapContainer = styled.div`
  height: 100%;
`;

export { SImg, MapContainer };
