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

const SWrap = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 2;

  color: black;
  background-color: white;

  overflow-y: scroll;
  max-width: 290px;
  max-height: 500px;
`;

const SForm = styled.form`
  padding: 10px;

  display: flex;
  gap: 10px;

  background-color: #258fff;
`;

const SPlace = styled.li`
  display: flex;
  gap: 10px;
`;

export { SImg, MapContainer, SForm, SWrap, SPlace };
