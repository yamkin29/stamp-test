import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import emulator from '../../emulator';
import {RootState} from "../../../redux/store";
import {resetOrder} from "../../../redux/reducers/orderSlice";

const CoffeePreparationPage = () => {
    const selectedDrink = useSelector((state: RootState) => state.order.selectedDrink);
    const change = useSelector((state: RootState) => state.order.change);
    const [status, setStatus] = useState("Приготовление...");
    const paymentMethod = useSelector((state: RootState) => state.order.paymentMethod);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDrink === null) return;

        emulator.Vend(selectedDrink, (result: boolean) => {
            setStatus(result ? "Ваш кофе готов!" : "Ошибка при выдаче напитка.");
            setTimeout(() => {
                dispatch(resetOrder());
                navigate("/");
            }, 3000);
        });
    }, [selectedDrink, dispatch, navigate]);


    return (
        <div>
            <h2>{status}</h2>
            {paymentMethod === 'cash' && change > 0 && <p>Сдача: {change} руб.</p>}
        </div>
    );
};

export default CoffeePreparationPage;