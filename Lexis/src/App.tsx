import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./assets/slices/store"; // Assuming store is in the same directory
import MainPage from "./assets/pages/Main";


function App() {

  return (
    <>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </>
  );
}

export default App;
