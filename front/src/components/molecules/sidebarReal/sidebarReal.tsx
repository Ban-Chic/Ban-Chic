import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";
import useLogout from "../../../hooks/auth/useLogout";

interface Props {
  width: number;
  $isOpenCheck: boolean;
}

const SidebarReal = ({ width, $isOpenCheck }: Props) => {
  const [xPosition, setX] = useState(-width);
  const side = useRef<HTMLDivElement>(null);
  const accessToken = localStorage.getItem("accessToken");
  const Logout = useLogout();

  useEffect(() => {
    if ($isOpenCheck) {
      setX(0);
    } else {
      setX(-width);
    }
  }, [$isOpenCheck, width]);

  const goToHome = () => {
    window.location.href = Page_Url.Main;
  };

  const goToLogin = () => {
    window.location.href = Page_Url.Login;
  };

  return (
    <SContainer $isOpenCheck={$isOpenCheck}>
      <SSidebar>
        <SDiv
          ref={side}
          style={{
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          {accessToken === null ? (
            <SButton onClick={() => goToLogin()}>LOGIN</SButton>
          ) : (
            <SButton onClick={() => Logout()}>LOGOUT</SButton>
          )}
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `${width}px`,
            height: "100px",
            transformOrigin: "right",
            transform: `translatex(${xPosition - 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          {/* <SMenuLink to={Page_Url.Main}>HOME</SMenuLink> */}
          <SButton onClick={goToHome}>HOME</SButton>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink to={Page_Url.SurveyLanding}>SURVEY</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `${width}px`,
            height: "100px",
            transformOrigin: "right",
            transform: `translatex(${xPosition - 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink to={Page_Url.Recommend}>SEARCH</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink to={Page_Url.My}>MY PAGE</SMenuLink>
        </SDiv>
      </SSidebar>
    </SContainer>
  );
};

const SContainer = styled.div<{ $isOpenCheck: boolean }>`
  background-color: #e3ecf1;
  opacity: ${({ $isOpenCheck }) => ($isOpenCheck ? 1 : 0)};
  transition: 1.3s ease;
  z-index: ${({ $isOpenCheck }) => ($isOpenCheck ? 10 : -1)};
`;

const SSidebar = styled.div`
  background-color: #191919;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: white;
  height: 100%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const SMenuLink = styled(Link)`
  ${theme.font.KumarOneRegular};
  line-height: 1.5;
  font-size: 4em;
  @media only screen and (min-width: 768px) {
    font-size: 6.3em;
  }
`;

const SButton = styled.button`
  ${theme.font.KumarOneRegular};
  font-size: 6.3em;
  line-height: 1.5;
`;

const SDiv = styled.div`
  transition: 1s ease;
  position: relative;
  z-index: 0;
  width: 100%;
  &:nth-child(1) {
    font-size: 5px;
  }
  &:nth-child(odd) {
    text-align: start;
  }
  &:nth-child(even) {
    text-align: end;
  }
`;

export default SidebarReal;
