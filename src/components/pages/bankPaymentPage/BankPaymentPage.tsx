import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emulator from '../../emulator';
import {RootState} from "../../../redux/store";
import {
    addBankPaymentMessage,
    clearBankPaymentMessages,
    setTransactionStatus
} from "../../../redux/reducers/orderSlice";
import {coffeeProducts} from "../../products";

const BankPaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bankPaymentMessages = useSelector((state: RootState) => state.order.bankPaymentMessages);
    const transactionStatus = useSelector((state: RootState) => state.order.transactionStatus);
    const selectedDrink = useSelector((state: RootState) => state.order.selectedDrink);

    const coffeePrice = selectedDrink !== null ? coffeeProducts[selectedDrink].price : 0;

    const handleBankPayment = () => {
        dispatch(clearBankPaymentMessages());
        dispatch(setTransactionStatus('pending'));

        emulator.BankCardPurchase(coffeePrice, (result: boolean) => {
            dispatch(setTransactionStatus(result ? 'success' : 'failure'));
            if (result) {
                setTimeout(() => {
                    navigate("/preparation");
                }, 1000);
            }
        }, (msg: string) => {
            dispatch(addBankPaymentMessage(msg));
        });
    };

    return (
        <div>
            <h2>Оплата банковской картой</h2>
            <p>Цена выбранного кофе: {coffeePrice} руб.</p>
            <button onClick={handleBankPayment}>Оплатить {coffeePrice} руб.</button>
            <div>
                {bankPaymentMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            {transactionStatus === 'failure' && <p>Платеж не прошёл. Попробуйте ещё раз.</p>}
        </div>
    );
};

export default BankPaymentPage;