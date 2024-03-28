import styled from "styled-components";

const SImg = styled.img`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 15px;
  padding: 5px;

  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;
  cursor: pointer;

  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
`;
const MapContainer = styled.div`
  height: 100%;
`;

export { SImg, MapContainer };
