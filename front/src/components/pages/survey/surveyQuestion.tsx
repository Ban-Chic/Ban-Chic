import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { postSurvey } from "../../../api/Api";
import { useNavigate } from "react-router";
import Page_Url from "../../../router/Url";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function SurveyQuestionPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Record<string, number>>({
    clear: 0,
    romantic: 0,
    pretty: 0,
    casual: 0,
    coolcasual: 0,
    natural: 0,
    elegant: 0,
    dynamic: 0,
    wild: 0,
    gorgeous: 0,
    chic: 0,
    modern: 0,
    classic: 0,
    dandy: 0,
  });
  const [preferencesBoolean, setPreferencesBoolean] = useState<
    Record<string, boolean>
  >({
    clear: false,
    romantic: false,
    pretty: false,
    casual: false,
    coolcasual: false,
    natural: false,
    elegant: false,
    dynamic: false,
    wild: false,
    gorgeous: false,
    chic: false,
    modern: false,
    classic: false,
    dandy: false,
  });

  const [currentRound, setCurrentRound] = useState(1);

  const handleRound = (choice: string) => {
    // 선택한 미적 기준의 값을 증가
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [choice]: (prevPreferences[choice] || 0) + 1,
    }));

    // 다음 라운드로 이동
    setCurrentRound((prevRound) => prevRound + 1);
  };

  useEffect(() => {
    if (currentRound > 14) {
      setCurrentRound(0);
      Object.keys(preferences).map((item) =>
        setPreferencesBoolean((prevPreferences) => ({
          ...prevPreferences,
          [item]: prevPreferences[item] ? true : false,
        }))
      );
      console.log(JSON.stringify(preferencesBoolean));
      postSurvey(preferencesBoolean).then(() => {
        navigate(Page_Url.SurveyResult);
      });
    }
  }, [navigate, preferences, preferencesBoolean, currentRound]);

  // 라운드 Three에 대한 핸들러가 필요한 경우 여기에 추가
  return (
    <AnimatePresence mode="wait">
      <SResultContainer>
        {currentRound === 0 && <LoadingSpinner />}
        {currentRound === 1 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "맑고 투명한 호수 vs 별빛이 반짝이는 화려하고 사치스러운 향락 파티",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey1.png"
                onClick={() => handleRound("clear")}
              >
                맑고 투명한 호수
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey2.png"
                onClick={() => handleRound("gorgeous")}
              >
                별빛이 반짝이는 화려하고 사치스러운 향락 파티
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 2 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["빅토리아 시대의 장미 정원 vs 모던한 현대 미술관"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey3.png"
                onClick={() => handleRound("romantic")}
              >
                빅토리아 시대의 장미 정원
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey4.png"
                onClick={() => handleRound("modern")}
              >
                모던한 현대 미술관
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 3 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "포근포근 파스텔 색의 마카롱 vs 젠틀하게 잘 다려진 수트",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey5.png"
                onClick={() => handleRound("pretty")}
              >
                포근포근 파스텔 색의 마카롱
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey6.png"
                onClick={() => handleRound("dandy")}
              >
                젠틀하게 잘 다려진 수트
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 4 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["편안한 주말 브런치 vs 엄숙한 오페라 하우스"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey7.png"
                onClick={() => handleRound("coolcasual")}
              >
                편안한 주말 브런치
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey8.png"
                onClick={() => handleRound("elegant")}
              >
                엄숙한 오페라 하우스
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 5 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["캠퍼스 내 캐주얼한 일상 vs 패션쇼의 선도적인 시크함"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey9.png"
                onClick={() => handleRound("casual")}
              >
                캠퍼스 내 캐주얼한 일상
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey11.png"
                onClick={() => handleRound("chic")}
              >
                패션쇼의 선도적인 시크함
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 6 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "산 속의 피톤치드 가득한 공기 vs 도시의 활기 넘치는 에너지",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey12.png"
                onClick={() => handleRound("natural")}
              >
                산 속의 피톤치드 가득한 공기
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey13.png"
                onClick={() => handleRound("dynamic")}
              >
                도시의 활기 넘치는 에너지
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 7 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["고전 음악회의 우아한 선율 vs 무자비한 사파리 탐험"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey14.png"
                onClick={() => handleRound("elegant")}
              >
                고전 음악회의 우아한 선율
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey15.png"
                onClick={() => handleRound("wild")}
              >
                무자비한 사파리 탐험
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 8 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "느긋한 카페 테라스의 오후 vs 강렬한 모터사이클 레이싱",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey16.png"
                onClick={() => handleRound("casual")}
              >
                느긋한 카페 테라스의 오후
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey17.png"
                onClick={() => handleRound("dynamic")}
              >
                강렬한 모터사이클 레이싱
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 9 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["명품 부티크의 고급스러움 vs 펑키한 언더그라운드 클럽"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey18.png"
                onClick={() => handleRound("gorgeous")}
              >
                명품 부티크의 고급스러움
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey19.png"
                onClick={() => handleRound("wild")}
              >
                펑키한 언더그라운드 클럽
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 10 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "심플한 모노톤의 도시적 미감 vs 클래식 영화의 빈티지한 감성",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey20.png"
                onClick={() => handleRound("modern")}
              >
                심플한 모노톤의 도시적 미감
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey30.png"
                onClick={() => handleRound("classic")}
              >
                클래식 영화의 빈티지한 감성
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 11 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "자연 그대로의 싱그러움 vs 직선과 각진 형태의 모던한 디자인",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey21.png"
                onClick={() => handleRound("natural")}
              >
                자연 그대로의 싱그러움
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey22.png"
                onClick={() => handleRound("modern")}
              >
                직선과 각진 형태의 모던한 디자인
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 12 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "우아한 클래식 음악회 vs 혁신적이고 창의적인 스타트업 오피스",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey24.png"
                onClick={() => handleRound("elegant")}
              >
                우아한 클래식 음악회
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey25.png"
                onClick={() => handleRound("dynamic")}
              >
                혁신적이고 창의적인 스타트업 오피스
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 13 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={[
                  "옛날 사진첩 속 흑백사진 vs 첨단 기술이 가득한 미래 도시",
                ]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey26.png"
                onClick={() => handleRound("classic")}
              >
                옛날 사진첩 속 흑백사진
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey27.png"
                onClick={() => handleRound("modern")}
              >
                첨단 기술이 가득한 미래 도시
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound === 14 && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["명예의 전당에 오른 정장 vs 자유로운 영혼의 가죽 재킷"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                variants={FL}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey28.png"
                onClick={() => handleRound("dandy")}
              >
                명예의 전당에 오른 정장
              </SFButton>
              <SFButton
                variants={FR}
                initial="initial"
                animate="animate"
                exit="exit"
                $url="/survey/survey29.png"
                onClick={() => handleRound("casual")}
              >
                자유로운 영혼의 가죽 재킷
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {currentRound > 14 && <div>수고</div>}
      </SResultContainer>
    </AnimatePresence>
  );
}

const FL = {
  initial: {
    translateX: -1000,
    translateY: -1000,
    translateZ: -1000,
    rotateZ: -180,
  },
  animate: {
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateZ: 0,
  },
  exit: {
    translateX: -1000,
    translateY: -1000,
    translateZ: -1000,
    rotateZ: -180,
  },
};

const FR = {
  initial: {
    translateX: 1000,
    translateY: -1000,
    translateZ: -1000,
    rotateZ: 180,
  },
  animate: {
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateZ: 0,
  },
  exit: {
    translateX: 1000,
    translateY: -1000,
    translateZ: -1000,
    rotateZ: 180,
  },
};

const SFButton = styled(motion.button)<{ $url: string }>`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  @media only screen and (max-width: 768px) {
    margin: 0px;
  }
`;

const SQuestionBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButtonBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1em;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SResult = styled(motion.article)`
  width: 100%;
  height: 70vh;
  padding: 1em;
  border-radius: 5px;
  margin: 0 10%;
  max-width: 1200px;
  font-size: 18px;
  ${theme.styleBase.glassmorphism}
  display: flex;
  white-space: break-spaces;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    height: 80vh;
  }
`;

const SResultContainer = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SurveyQuestionPage;
