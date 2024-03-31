// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import theme from "../../../styles/Theme";
// import GPTSample from "../../molecules/gptApi/gptSample";
// import { HeartFilled } from "@ant-design/icons";
// import {
//   getLike,
//   getPerfumeDetail,
//   getPerfumeReviews,
//   postLike,
// } from "../../../api/Api";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";

// import RadarChartContainer from "../../molecules/charts/radarChart";
// import NoteGroup from "../../molecules/detail/noteGroup";
// import { Link } from "react-router-dom";

// interface Props {
//   data: {
//     id: number;
//     perfumeImg: string;
//     perfumeName: string;
//     RadioNodeListing: number;
//     bestRate: number;
//     vote: number;
//     notes: string;
//     season: object;
//     TopNotes: string[];
//     MiddleNotes: string[];
//     BottomNotes: string[];
//     hearts: number;
//   } | null;
// }

// function PerfumeDetail() {
//   const { perfumeId } = useParams() as { perfumeId: string };
//   const [isOpen, setIsOpen] = useState(false);
//   const [data, setData] = useState<Props["data"]>();
//   const [notes, setNotes] = useState<Props["data"]>();
//   const [isLike, setIsLike] = useState(false);

//   useEffect(() => {
//     getPerfumeDetail(perfumeId).then((data) => {
//       setData(data.data);
//       setNotes(JSON.parse(data.data.data.notes));
//     });
//     getPerfumeReviews(perfumeId).then((response) => {
//       console.log(response);
//     });
//     getLike(perfumeId).then((response) => {
//       console.log("이게 조항요");
//       console.log(response.data.data);
//       setIsLike(response.data.data);
//     });
//   }, [perfumeId]);

//   const onClickHandler = () => {
//     postLike(perfumeId).then((response) => {
//       console.log(response);
//       setIsLike(!isLike);
//     });
//   };

//   return (
//     <>
//       <SDetailContainer>
//         <SBlock>
//           {data && <SImg src={data.data.perfumeImg} alt="Perfume Img" />}
//           <SLikeButton onClick={onClickHandler}>
//             <HeartFilled
//               style={
//                 isLike
//                   ? { color: "red", fontSize: "30px" }
//                   : { color: "white", fontSize: "30px" }
//               }
//             />
//             {/* <HeartOutlined style={{ color: "white", fontSize: "30px" }} /> */}
//           </SLikeButton>
//         </SBlock>
//         <SBlock>
//           {data && data.season && <RadarChartContainer season={data.season} />}
//         </SBlock>
//         <SBlock>
//           {data && (
//             <GPTSample
//               perfumeName={data.data.perfumeName}
//               notes={data.data.notes}
//             />
//           )}
//         </SBlock>
//         <SBlock>
//           {data && notes["TopNotes"] && (
//             <>
//               <SNote>
//                 <SNoteCate>Top Notes</SNoteCate>
//                 <NoteGroup notes={data.data?.notes} noteName={"TopNotes"} />
//               </SNote>
//             </>
//           )}
//           {data && notes["MiddleNotes"] && (
//             <>
//               <SNote>
//                 <SNoteCate>Middle Notes</SNoteCate>
//                 <NoteGroup notes={data.data.notes} noteName={"MiddleNotes"} />
//               </SNote>
//             </>
//           )}
//           {data && notes["BaseNotes"] && (
//             <>
//               <SNote>
//                 <SNoteCate>Base Notes</SNoteCate>
//                 <NoteGroup notes={data.data.notes} noteName={"BaseNotes"} />
//               </SNote>
//             </>
//           )}
//         </SBlock>
//         <SBlock>
//           <SParent
//             layout
//             isOpenCheck={isOpen}
//             initial={{ borderRadius: 50 }}
//             onClick={() => setIsOpen(!isOpen)}
//             transition={{
//               opacity: { ease: "linear" },
//               layout: { duration: 0.6 },
//             }}
//           >
//             <ReviewPage />
//           </SParent>
//         </SBlock>
//         <SBlock>
//           {data && <SPerfumeName> {data.data.perfumeName}</SPerfumeName>}
//           {data && <SPerfumeName> {data.data.koreanName}</SPerfumeName>}
//         </SBlock>
//       </SDetailContainer>
//       <div>
//         <Link to="/perfumes/review/crud">CRUD Test</Link> |
//         <Link to="/perfumes/1/reviews"> Review Zone</Link> |
//       </div>
//     </>
//   );
// }

// const SDetailContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: repeat(4, 1fr);
//   padding: 3rem;
//   gap: 15px;
//   height: calc(100vh - 50px);
//   max-width: 1200px;
//   margin: 0 auto;
//   position: relative;
// `;

// const SBlock = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   background-color: black;
//   &:nth-child(1) {
//     grid-column: 1 / span 2;
//     grid-row: 1 / span 3;
//     &:hover {
//       background-color: yellowgreen;
//     }
//   }
//   &:nth-child(2) {
//     grid-column: 3 / span 2;
//     grid-row: 1 / span 2;
//     background-color: black;
//     display: flex;
//     flex-direction: column;
//   }
//   &:nth-child(4) {
//     grid-column: 3 / span 2;
//     grid-row: 3 / span 2;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     &:hover {
//       background-color: red;
//     }
//   }
//   &:nth-child(3) {
//     grid-column: 5 / span 2;
//     grid-row: 1 / span 2;
//     display: flex;
//     flex-direction: column;
//     &:hover {
//       background-color: yellowgreen;
//     }
//   }
//   &:nth-child(5) {
//     grid-column: 5 / span 2;
//     grid-row: 3 / span 2;
//     &:hover {
//       background-color: yellowgreen;
//     }
//   }
//   &:nth-child(6) {
//     grid-column: 1 / span 2;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     &:hover {
//       background-color: yellowgreen;
//     }
//   }
// `;

// const SImg = styled.img`
//   margin: 0 auto;
// `;

// const SNote = styled.div``;

// const SNoteCate = styled.div`
//   ${theme.font.Title};
//   padding: 10px;
// `;

// const SPerfumeName = styled.div`
//   ${theme.font.Title};
// `;

// const SLikeButton = styled.button`
//   position: absolute;
//   z-index: 3;
//   margin-left: 250px;
// `;

// const SParent = styled(motion.div)<{ isOpenCheck: boolean }>`
//   background: white;
//   width: ${(props) => (props.isOpenCheck ? "45.9%" : "100%")};
//   height: ${(props) => (props.isOpenCheck ? "86.5%" : "100%")};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: ${(props) => (props.isOpenCheck ? "fixed" : "static")};
//   z-index: 1;
//   top: ${(props) => (props.isOpenCheck ? "9%" : "0%")};
//   right: ${(props) => (props.isOpenCheck ? "16%" : "0%")};
//   background-color: darkgreen;
//   color: black;
// `;

// export default PerfumeDetail;
