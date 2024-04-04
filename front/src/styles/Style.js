import color from "./Color";

const styleBase = {
  glassmorphism: `
  background: ${color.clearBlockColor};
  backdrop-filter: blur( 1px );
  -webkit-backdrop-filter: blur( 0.5px );
  border: 2px solid #e2e2e2;`,
};

export default styleBase;
