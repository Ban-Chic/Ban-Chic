import { motion, Variants } from "framer-motion";
import { Suspense, useState, useEffect } from "react";
import { HeartIcon } from "./HeartIcon";
import styled from "styled-components";
import useGetHeart, { useUpdateHeart } from "../../../hooks/heart/useGetHeart";
import useGetPerfumeDetail from "../../../hooks/info/useGetDetail";

interface Props {
  perfumeId: string;
}

function LikeButton({ perfumeId }: Props) {
  const [isHover, setIsHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const postHeart = useUpdateHeart(perfumeId);
  const { data: hearts } = useGetHeart(perfumeId);
  const [shouldRotate, setShouldRotate] = useState(false);
  const { data: perfumeDetailInfo } = useGetPerfumeDetail(perfumeId);

  const heartMutation = () => {
    postHeart.mutate();
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(!!hearts.data);
  }, [hearts.data, perfumeDetailInfo]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setShouldRotate(mediaQuery.matches);

    const handler = (e: any) => setShouldRotate(e.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, []);

  return (
    <SButton
      initial={hearts.data}
      animate={
        shouldRotate
          ? [isLiked ? "liked" : "unliked", isHover ? "hover" : "rest"]
          : [isLiked ? "liked" : "unliked", isHover ? "hover" : "mobileRest"]
      }
      whileTap="press"
      variants={buttonVariants}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={() => heartMutation()}
    >
      <SIcon
        variants={{
          liked: { opacity: 0, transition: { duration: 0.2, delay: 0.3 } },
          hover: isLiked
            ? { opacity: 0, transition: { duration: 0.2, delay: 0.3 } }
            : { opacity: 1 },
        }}
      >
        <Suspense fallback={null}>
          <HeartIcon isHover={isHover} isLiked={isLiked} />
        </Suspense>
      </SIcon>
      <SLabel>
        <SDefault variants={labelTextVariants}>
          Like
          <motion.span variants={successTextVariants} className="success">
            d!
          </motion.span>
        </SDefault>
      </SLabel>
      <SNumber>
        <SCurrent variants={currentCountVariants}>
          {perfumeDetailInfo.data.hearts}
        </SCurrent>
        <SNew variants={newCountVariants}>{perfumeDetailInfo.data.hearts}</SNew>
      </SNumber>
    </SButton>
  );
}

const newCountVariants: Variants = {
  unliked: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  liked: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.3,
    },
  },
};

const currentCountVariants: Variants = {
  unliked: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  liked: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.25,
      delay: 0.3,
    },
  },
};

const buttonVariants: Variants = {
  rest: {
    // "--button-star-greyscale": "100%",
    // "--button-star-contrast": "0%",
    transition: { duration: 0.7 },
    scale: 1.0,
  },
  hover: {
    // "--button-star-greyscale": "0%",
    // "--button-star-contrast": "100%",
    scale: 1.15,
    y: -8,
  },
  mobileRest: {
    // "--button-star-greyscale": "0%",
    // "--button-star-contrast": "100%",
    scale: 1.0,
    y: -8,
  },
  press: { scale: 1.05 },
};

const labelTextVariants: Variants = {
  unliked: { x: 24 },
  liked: { x: -46 },
};

const successTextVariants: Variants = {
  unliked: { opacity: 0 },
  liked: { opacity: 1 },
};

const SButton = styled(motion.button)`
  /* --button-star-greyscale: 100%;
  --button-star-contrast: 0%; */
  width: 90%;
  height: 60%;
  z-index: 10;
  appearance: none;
  border: none;
  cursor: pointer;
  background-color: #fff;
  color: #5e5e5e;
  border-radius: 20px;
  outline: none;
  margin: 0;
  padding: 0;
  padding-left: 20%;
  font-family: "Montserrat Alternates";
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  line-height: 40px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  box-shadow:
    0px 40px 80px 0px rgba(0, 0, 0, 0.05),
    inset 0px -10px 20px 0px rgba(0, 0, 0, 0.05),
    0px 10px 20px 0px rgba(0, 0, 0, 0.05);
`;

const SIcon = styled(motion.div)`
  display: block;
  width: 600px;
  height: 300px;
  z-index: -15;
  pointer-events: none;
  transform-origin: 50% 52%;
  filter: grayscale(var(--button-star-greyscale))
    contrast(var(--button-star-contrast));
  opacity: 0.3;
  position: absolute;
  /* top: -100px; */
  left: -240px;
`;

const SLabel = styled(motion.div)`
  width: 140px;
  padding: 26px 0 22px;
  transform: translateZ(0);
`;

const SDefault = styled(motion.span)`
  display: block;
  font-size: 20px;
`;

const SCurrent = styled(motion.span)`
  color: #d9d9d9;
  opacity: 1;
  display: block;

  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  font-size: 30px !important;
`;

const SNew = styled(motion.span)`
  color: #fed600;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  display: block;
  font-size: 30px !important;
`;

const SNumber = styled(motion.div)`
  padding: 30px 36px;
  position: relative;
  transform: translateZ(0);
  ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: #e8e8e8;
    opacity: 0.4;
  }
`;

export default LikeButton;
