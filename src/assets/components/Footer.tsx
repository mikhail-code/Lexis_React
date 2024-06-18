import React from "react";
import Pattern from "../resources/img/Pattern.svg";
import Waves from "../resources/img/Waves.svg";

const Footer = () => {
  const patternWidth = window.innerWidth + 50;
  // const screenWidth = window.innerWidth + 50;
  const numPatterns = 1;

  const patternStyle = {
    width: patternWidth,
    height: 32,
    objectFit: "cover", // Cast objectFit to string
  };
  // const wavesStyle = {
  //   height: 100,
  //   position: 'absolute', // Position it over other elements
  //   top: -300,
  //   left: 0, // Align to the top of the parent
  //   width: '100%', // Take full width of the parent
  //   opacity: 0.3, // Make it 50% transparent
  // };

  return (
    <div className="fixed-bottom dark-blue-bg flex flex-col justify-top items-center h-20 min-w-full relative">
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

      <p className="text-white pt-3 z-10 relative">
        Lexis by Michael Shalom (2024)
      </p>
    </div>
  );
};

export default Footer;
