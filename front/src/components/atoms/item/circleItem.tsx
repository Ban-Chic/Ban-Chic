import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  url: string;
  imageUrl: string;
}

function CircleItem({ url, imageUrl }: Props) {
  return <SCircle to={url} imageUrl={imageUrl}></SCircle>;
}

const SCircle = styled(Link)<{ imageUrl: string }>`
  width: 3em;
  height: 3em;
  border-radius: 50px;
  background-color: red;
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
`;

export default CircleItem;
