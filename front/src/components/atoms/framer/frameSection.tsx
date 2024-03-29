import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function FrameSection({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <>
      <SSection ref={ref}>
        <span
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1.1)" : "scale(3)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          {children}
        </span>
      </SSection>
    </>
  );
}

const SSection = styled.section``;

export default FrameSection;
