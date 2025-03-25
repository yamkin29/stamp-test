import React from 'react';
import { Provider } from 'react-redux';
import store from "./redux/Store";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/pages/mainPage/MainPage";
import PayPage from "./components/pages/payPage/PayPage";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/paypage" element={<PayPage />} />
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
