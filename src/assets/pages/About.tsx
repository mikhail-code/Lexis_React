import React from "react";
import TopPanel from "../components/TopPanel";

import Footer from "../components/Footer";
import AboutText from "../components/AboutText";

const AboutPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col w-screen">
    <TopPanel />
    <div className="min-h-screen-minus-header-footer">
      <div className="w-1/5 min-w-64"></div>
      <div className="w-full flex flex-col justify-content-center items-center  min-h-96">
      <div className="w-full max-w-2xl p-4">
          <AboutText />
        </div>
      </div>
      <div className="w-1/5"></div>
    </div>
    <Footer/>
  </div>
  );
};

export default AboutPage;
