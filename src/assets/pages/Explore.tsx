import React from "react";
import TopPanel from "../components/TopPanel";

import Footer from "../components/Footer";

const DictionariesPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col w-screen">
      <TopPanel />
      <div className="min-h-screen-minus-header-footer">
        <div className="w-1/5 min-w-64"></div>
        <div className="w-full flex flex-col justify-content-center items-center mt-44 min-h-96 pt-8">
        <h1 className="text-2xl font-bold mb-4"><strong>Work in progress...</strong></h1>
        <p className="mb-2 text-left">
        Meanwhile... Did you know that in the ancient Olympics, there were no fancy gold medals. 
        </p>
        <p className="mb-2">
        Winners were simply crowned with olive wreaths. Maybe they included some complimentary olives for second and third place?
        </p>
        </div>
        <div className="w-1/5"></div>
      </div>
      <Footer/>
    </div>
  );
};

export default DictionariesPage;
