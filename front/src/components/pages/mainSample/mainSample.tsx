import styled from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import Perfume from "../../../../public/img_perfume_sample.png";

function MainSample() {
  const element = useRef<HTMLDivElement | null>(null);
  const [InviewPort, setInviewPort] = useState<boolean>(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInviewPort(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    if (element.current) {
      observer.observe(element.current);
    }
  }, []);

  return (
    <>
      <div>
        <SAboutContainer
          ref={element}
          className={InviewPort ? "animation" : ""}
        >
          <SAboutImg src={Perfume} alt="main img" />
          <div>
            <AboutTitle>당신의 매력을 반칙하세요.</AboutTitle>
            <AboutTitle>추구미에 맞는 향수를 추천해드립니다.</AboutTitle>
          </div>
        </SAboutContainer>
      </div>
      <div>
        <SAboutContainerReverse
          ref={element}
          className={InviewPort ? "animation" : ""}
        >
          <div>
            <AboutTitle>당신의 매력을 반칙하세요.</AboutTitle>
            <AboutTitle>추구미에 맞는 향수를 추천해드립니다.</AboutTitle>
          </div>
          <SAboutImg src={Perfume} alt="main img" />
        </SAboutContainerReverse>
      </div>
      <div>
        <SAboutContainer
          ref={element}
          className={InviewPort ? "animation" : ""}
        >
          <SAboutImg src={Perfume} alt="main img" />
          <div>
            <AboutTitle>당신의 매력을 반칙하세요.</AboutTitle>
            <AboutTitle>추구미에 맞는 향수를 추천해드립니다.</AboutTitle>
          </div>
        </SAboutContainer>
      </div>
      {/* <main>
        <SSpanContainer>
          메인sdfasdf
          
        </SSpanContainer>
      </main> */}
    </>
  );
}

const SSpanContainer = styled.span`
  color: white;
`;

const SAboutContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: #000;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  background-color: #070101;
  &.animation {
    animation-name: opacity;
    animation-duration: 5000ms;
    animation-fill-mode: forwards;

    /* @keyframes opacity {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    } */
  }
`;

const SAboutContainerReverse = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: #000;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  background-color: #070101;
  &.animation {
    animation-name: opacityReverse;
    animation-duration: 7000ms;
    animation-fill-mode: forwards;

    /* @keyframes opacityReverse {
      from {
        opacity: 0;
        transform: translateX(-100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    } */
  }
`;

const SAboutImg = styled.img`
  display: flex;
  flex-wrap: wrap;
  @media ${(props) => props.theme.desktop} {
    width: 700px;
  }
  @media ${(props) => props.theme.laptop} {
    width: 600px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 550px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 300px;
  }
  object-fit: contain;
`;

const AboutTitle = styled.h2`
  font-size: 1.5rem;
  margin-right: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2rem;
  }
  margin-left: 15px;
  color: white;
`;

export default MainSample;
