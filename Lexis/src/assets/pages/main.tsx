import React from "react";
import TopPanel from "../components/TopPanel";


const MainPage: React.FC = () => {

  return (
    <div className="h-full flex flex-col">
      <TopPanel>
        <h1>My App Title</h1>
        <button>Button 1</button>
        <button>Button 2</button>
      </TopPanel>
      <div className="w-full flex flex-row">
        <div className="bg-red-500 w-1/5 min-w-64">Left Panel (20%)</div>
        <div className="bg-green-500 grow">
          Middle Content (60%)
          </div>
        <div className="bg-yellow-500 w-1/5">Right Panel (20%)</div>
      </div>
    </div>
  );
};

export default MainPage;
