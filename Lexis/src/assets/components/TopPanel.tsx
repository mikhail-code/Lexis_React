import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../slices/store";
import { motion } from "framer-motion";

import LexisLogoDarkSVG from "../resources/img/LexisLogoDark.svg";
import LightningHamburgerMenu from "../resources/img/LightningHamburgerMenu.svg";
import LightningLine from "../resources/img/LightningLine.svg";

import UserInfo from "./UserInfo";

// later:
// import { setUser } from "../slices/userSlice";
// import { checkTokenExpiration } from "../actions/auth";

interface TopPanelProps {}

const TopPanel: React.FC<TopPanelProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const linkedList = [
    { text: "Main", path: "/" },
    { text: "Configuration", path: "/configuration" },
    { text: "Help", path: "/help" },
  ];
  const menuIconVariants = {
    hamburger: { src: LightningHamburgerMenu, transform: "translateY(0px)" }, // Default position
    line: { src: LightningLine, transform: "translateY(-3px)" }, // Move up 3px
  };
  const currentIcon = isOpen ? "line" : "hamburger";
  // Motion variants for sliding animation
  const listVariants = {
    closed: { height: 0 },
    open: { height: "auto", transition: { duration: 0.7 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -20 }, // Initial state: hidden and slightly above
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }, // Appear with slight delay and move down
  };
  const lightningLineVariants = {

    closed: { opacity: 0 }, // Initially invisible
    open: { opacity: 1, transition: { duration: 0.2, delay: 0.3 } }, // Appear after 0.5s delay
  };

  return (
    <div className="w-full flex flex-row justify-center items-center h-16">
      <div className="w-1/5  min-w-64 h-full flex items-center justify-center">
        <motion.img
          // Use currentIcon for both src and variants
          src={menuIconVariants[currentIcon].src}
          alt="Menu"
          width="32"
          height="32"
          onClick={handleMenuClick}
          animate={menuIconVariants[currentIcon]} // Animate based on current icon variant
          variants={menuIconVariants} // Define variants for animation
        />
      </div>
      <div className="flex items-center justify-center grow">
        <img src={LexisLogoDarkSVG} alt="Lexis Logo" width="130" height="130" />
      </div>
      <div className="w-1/5">
        <UserInfo />
      </div>
      {isOpen && (
        <motion.div
          variants={listVariants}
          animate={isOpen ? "open" : "closed"}
          style={{ position: "absolute", top: 56, left: 72, width: "full" }}
        >
          <ul className="list-none p-0 mt-2 flex flex-col justify-content-center items-center">
            {linkedList.map((link, index) => (
              <motion.li
                key={link.text}
                className="py-2 px-4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index} // Pass index for stagger effect
              >
                {/* gfs-neohellenic-bold */}
                <a href={link.path} className="gold-text">
                  {link.text}
                </a>
              </motion.li>
            ))}
            <motion.div
              variants={lightningLineVariants}
              initial="closed" // Set initial state to "closed"
              animate={isOpen ? "open" : "closed"} // Animate based on isOpen state
            >
              <img
                src={LightningLine}
                alt="Lightning Line"
                width="32"
                height="32"
                style={{ marginTop: "25px" }}
              />
            </motion.div>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default TopPanel;
