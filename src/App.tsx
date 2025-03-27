import React from 'react';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/pages/mainPage/MainPage";
import PayPage from "./components/pages/payPage/PayPage";
import CashPaymentPage from "./components/pages/сashPaymentPage/CashPaymentPage";
import BankPaymentPage from "./components/pages/bankPaymentPage/BankPaymentPage";
import CoffeePreparationPage from "./components/pages/coffeePreparationPage/CoffeePreparationPage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/paypage" element={<PayPage />} />
                    <Route path="/cash-payment" element={<CashPaymentPage />} />
                    <Route path="/bank-payment" element={<BankPaymentPage />} />
                    <Route path="/preparation" element={<CoffeePreparationPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;