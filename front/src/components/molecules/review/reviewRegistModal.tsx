// import styled, { css, keyframes } from "styled-components";

// function PopupMessage({ message }: Props) {
//     const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
//     return (
//       <Modal
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         style={customModalStyles}
//         ariaHideApp={false}
//         contentLabel="Pop up Message"
//         shouldCloseOnOverlayClick={false}
//       >
//       /*Modal창에 담을 컴포넌트 구성하기*/
//       </Modal>
//     );

// const customModalStyles: ReactModal.Styles = {
//     overlay: {
//       backgroundColor: " rgba(0, 0, 0, 0.4)",
//       width: "100%",
//       height: "100vh",
//       zIndex: "10",
//       position: "fixed",
//       top: "0",
//       left: "0",
//     },
//     content: {
//       width: "360px",
//       height: "180px",
//       zIndex: "150",
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       borderRadius: "10px",
//       boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
//       backgroundColor: "white",
//       justifyContent: "center",
//       overflow: "auto",
//     },
//   };