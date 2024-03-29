import styled from "styled-components";

interface Props {
  item: object;
}

function ReviewListItem({ item }: Props) {
  return <SItemContainer></SItemContainer>;
}

const SItemContainer = styled.section`
  padding: 1em;
  background-color: red;
  border: white 1px solid;
  margin: 3px;
  border-radius: 5px;
`;

export default ReviewListItem;
