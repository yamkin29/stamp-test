import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emulator from '../../emulator';
import { RootState } from '../../../redux/store';
import {
    addBankPaymentMessage,
    clearBankPaymentMessages,
    setTransactionStatus
} from '../../../redux/reducers/orderSlice';
import { coffeeProducts } from '../../products';
import './BankPaymentPage.css';

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

        emulator.BankCardPurchase((result: boolean) => {
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

    const handleBack = () => {
        emulator.BankCardCancel();
        dispatch(clearBankPaymentMessages());
        dispatch(setTransactionStatus('idle'));
        navigate("/");
    };

    return (
        <div className="bank-container">
            <h2 className="bank-title">Оплата банковской картой</h2>
            <p className="bank-info">Цена выбранного кофе: {coffeePrice} руб.</p>
            <button className="bank-payment-button" onClick={handleBankPayment}>
                Оплатить {coffeePrice} руб.
            </button>
            <div className="bank-messages">
                {bankPaymentMessages.length > 0 && (
                    <p className="bank-message">
                        {bankPaymentMessages[bankPaymentMessages.length - 1]}
                    </p>
                )}
            </div>
            {transactionStatus === 'failure' && (
                <p className="bank-error">Платеж не прошёл. Попробуйте ещё раз.</p>
            )}
            <button className="bank-back-button" onClick={handleBack}>
                Вернуться к выбору напитков
            </button>
        </div>
    );
};

export default BankPaymentPage;