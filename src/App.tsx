
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from "./assets/slices/store"; 

import LexisPage from "./assets/pages/Lexis";
import DictionariesPage from "./assets/pages/Dictionaries";
import AboutPage from "./assets/pages/About";
import ExplorePage from "./assets/pages/Explore";
import DictionaryDataPage from "./assets/pages/DictionaryData";

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LexisPage />} />
          <Route path="/dictionaries" element={<DictionariesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dictionaries/:dictionaryId" element={<DictionaryDataPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
