import React from "react";
import TopPanel from "../components/TopPanel";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const MainPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col w-screen">
      <TopPanel>
        <h1>My App Title</h1>
        <button>Button 1</button>
        <button>Button 2</button>
      </TopPanel>
      <div className="min-h-screen-minus-header-footer">
        <div className="w-1/5 min-w-64"></div>
        <div className="w-full flex flex-col justify-content-center items-center min-h-96 pt-8"> {/* Adjusted SearchBar container */}
          <SearchBar />
          {/* More content here */}
        </div>
        <div className="w-1/5"></div>
      </div>
      <Footer/> {/* Footer with flex-shrink-0 */}
    </div>
  );
};

export default MainPage;
