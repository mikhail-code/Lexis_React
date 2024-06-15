
import "./App.css";
import { Provider } from "react-redux";
import store from "./assets/slices/store"; 
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
