import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "../../atoms/menuItem/menuItem";
import styled from "styled-components";
import { MenuItemTest } from "../../atoms/menuItem/menuItemTest";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <SUl variants={variants}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
      
    ))}
    {/* <MenuItemTest/> */}
  </SUl>
);

const itemIds = [0, 1, 2, 3, 4];

const SUl = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  top: 100px;
  width: 230px;
  margin: 0;
`;
