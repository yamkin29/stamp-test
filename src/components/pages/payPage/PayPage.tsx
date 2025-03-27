import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPaymentMethod } from '../../../redux/reducers/orderSlice';
import './PayPage.css';

const PayPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCash = () => {
        dispatch(setPaymentMethod('cash'));
        navigate("/cash-payment");
    };

    const handleBank = () => {
        dispatch(setPaymentMethod('bank'));
        navigate("/bank-payment");
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="pay-container">
            <h2 className="pay-title">Выберите способ оплаты</h2>
            <div className="pay-buttons">
                <button onClick={handleCash}>Наличные</button>
                <button onClick={handleBank}>Банковская карта</button>
            </div>
            <p className="pay-text">
                Пожалуйста, выберите удобный способ оплаты и следуйте дальнейшим инструкциям.
            </p>
            <button className="back-button" onClick={handleBack}>
                Вернуться к выбору напитков
            </button>
        </div>
    );
};

export default PayPage;