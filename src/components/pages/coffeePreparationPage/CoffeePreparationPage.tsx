import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emulator from '../../emulator';
import { RootState } from '../../../redux/store';
import { resetOrder } from '../../../redux/reducers/orderSlice';
import "./CoffeePreparationPage.css";

const CoffeePreparationPage = () => {
    const selectedDrink = useSelector((state: RootState) => state.order.selectedDrink);
    const change = useSelector((state: RootState) => state.order.change);
    const [status, setStatus] = useState("Приготовление...");
    const paymentMethod = useSelector((state: RootState) => state.order.paymentMethod);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDrink === null) return;

        emulator.Vend((result: boolean) => {
            setStatus(result ? "Ваш кофе готов!" : "Ошибка при выдаче напитка.");
            setTimeout(() => {
                dispatch(resetOrder());
                navigate("/");
            }, 3000);
        });
    }, [selectedDrink, dispatch, navigate]);

    return (
        <div className="prep-container">
            <h2 className="prep-status">{status}</h2>
            <p className="prep-instructions">
                Нажмите 1 для успешной выдачи, 2 для неуспешной выдачи
            </p>
            {paymentMethod === 'cash' && change > 0 && (
                <p className="prep-change">Сдача: {change} руб.</p>
            )}
        </div>
    );
};

export default CoffeePreparationPage;