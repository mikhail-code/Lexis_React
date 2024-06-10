import React from "react";
import TopPanel from "../components/TopPanel";
import SearchBar from "../components/SearchBar";

const MainPage: React.FC = () => {

  return (
    <div className="h-full flex flex-col">
      <TopPanel>
        <h1>My App Title</h1>
        <button>Button 1</button>
        <button>Button 2</button>
      </TopPanel>
      <div className="w-full flex flex-row">
        <div className="w-1/5 min-w-64"></div>
        <div className="grow flex flex-col justify-content-center items-center min-h-96 pt-8">
          <SearchBar />
          </div>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default MainPage;
