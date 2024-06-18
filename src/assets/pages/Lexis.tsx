import React from "react";
import TopPanel from "../components/TopPanel";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const MainPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col w-screen">
      <TopPanel />
      <div className="min-h-screen-minus-header-footer">
        <div className="w-1/5 min-w-64"></div>
        <div className="w-full flex flex-col justify-content-center items-center pt-8">
          {" "}
          <SearchBar />
        </div>
        <div className="w-1/5"></div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
