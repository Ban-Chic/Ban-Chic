import useToggle from "../../../../hooks/ui/useToggle";
import useWindowWidth from "../../../../hooks/ui/useWindowWidth";
import MenuToggle from "../../../atoms/menuToggle/menuToggle";
import SidebarReal from "../../sidebarReal/sidebarReal";

function SideBar() {
  const { isOpen, toggleMenu } = useToggle();
  const windowWidth = useWindowWidth();
  return (
    <>
      <SidebarReal width={windowWidth} isOpenCheck={isOpen}></SidebarReal>
      <MenuToggle toggle={() => toggleMenu()} isOpen={isOpen} />
    </>
  );
}

export default SideBar;
