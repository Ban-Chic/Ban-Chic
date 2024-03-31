import { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

interface Nums {
  xx: number;
  yy: number;
  zz: number;
  deg: number;
}

type PropsWithNums = ParallaxProps & Nums;

function ParallaxText({
  children,
  baseVelocity = 100,
  xx = 1,
  yy = 1,
  zz = 1,
  deg = 0,
}: PropsWithNums) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <SParallax xx={xx} yy={yy} zz={zz} deg={deg}>
      <SScroller style={{ x }}>
        <SSpan>{children} </SSpan>
        <SSpan>{children} </SSpan>
        <SSpan>{children} </SSpan>
        <SSpan>{children} </SSpan>
      </SScroller>
    </SParallax>
  );
}

/** 패럴랙스 텍스트 함수, perspective태그로 감쌀것
 * @param children(string): 내용,
 * @param xx(number): x축,
 * @param yy(number): y축,
 * @param zz(number): z축,
 * @param deg(number): 각도,
 * @param baseVelocity(number) : 빠르기, + -로 좌우조절,
 */
function ParallaxTextforUse({
  children,
  baseVelocity,
  xx,
  yy,
  zz,
  deg,
}: PropsWithNums) {
  return (
    <>
      <ParallaxText
        xx={xx}
        yy={yy}
        zz={zz}
        deg={deg}
        baseVelocity={baseVelocity}
      >
        {children}
      </ParallaxText>
    </>
  );
}

export default ParallaxTextforUse;

const SParallax = styled.div<Nums>`
  letter-spacing: -2px;
  line-height: 0.8;
  margin: 0;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  transform: rotate3d(
    ${(props) => props.xx},
    ${(props) => props.yy},
    ${(props) => props.zz},
    ${(props) => props.deg}deg
  );
`;

const SScroller = styled(motion.div)`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 400px;
  display: flex;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
`;

const SSpan = styled.span`
  display: block;
  margin-right: 30px;
`;
