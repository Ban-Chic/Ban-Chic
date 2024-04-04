import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../../styles/Theme";

interface Props {
  url: string;
  $imageUrl: string;
}

function CircleItem({ url, $imageUrl }: Props) {
  return <SCircle to={url} $ImageUrl={$imageUrl}></SCircle>;
}

const SCircle = styled(Link)<{ $ImageUrl: string }>`
  width: 3em;
  height: 3em;
  border-radius: 50px;
  background-color: gray;
  background-image: url(${(props) => props.$ImageUrl});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  border: ${theme.color.fontColor} 0.1em solid;
`;

export default CircleItem;
