import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{margin:0;padding:0;font:inherit;color:inherit;}
    *, :after, :before {box-sizing:border-box;}
    :root {-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%;text-size-adjust:100%;cursor:default;line-height:1.5;overflow-wrap:break-word;word-break:break-word;tab-size:4}
    html, body { overflow-x:hidden; background-color: ${(props) => props.theme.color.bgColor}; font-family: 'Pretendard'; color:${(props) => props.theme.color.fontColor}; font-weight: 400;}
    body::-webkit-scrollbar { display: none; }
    img, picture, video, canvas, svg {display: block;max-width:100%;}
    button {background:none;border:0;cursor:pointer;}
    a {text-decoration:none}
    table {border-collapse:collapse;border-spacing:0}
    li {list-style-type: none;}
`;

export default GlobalStyles;
