import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setPaymentMethod} from "../../../redux/reducers/orderSlice";

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

    return (
        <div>
            <h2>Выберите способ оплаты</h2>
            <button onClick={handleCash}>Наличные</button>
            <button onClick={handleBank}>Банковская карта</button>
        </div>
    );
};

export default PayPage;