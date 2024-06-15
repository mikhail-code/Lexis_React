import React from "react";
import Pattern from "../resources/img/Pattern.svg";

const Footer = () => {
  const patternWidth = window.innerWidth + 50;
  // const screenWidth = window.innerWidth + 50;
  const numPatterns = 1;

  const patternStyle = {
    width: patternWidth,
    height: 32,
    objectFit: "cover", // Cast objectFit to string
  };

  return (
    <div className="fixed-bottom dark-blue-bg flex flex-col justify-top items-center h-20 min-w-full">
      <div className="flex overflow-x-hidden">
        {Array.from({ length: numPatterns }).map((_, index) => (
          <img
            key={index}
            src={Pattern}
            alt={`Footer Pattern ${index + 1}`}
            className={`top-0 left-${index * patternWidth}px z-0`}
            style={patternStyle}
          />
        ))}
      </div>
      <p className="text-white pt-3">Lexis by Michael Shalom (2024)</p>
    </div>
  );
};

export default Footer;
