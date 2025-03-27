import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import emulator from "../../emulator";
import { coffeeProducts } from "../../products";
import { RootState } from "../../../redux/store";
import { addInsertedAmount, setChange } from "../../../redux/reducers/orderSlice";
import "./CashPaymentPage.css";

const CashPaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const insertedAmount = useSelector((state: RootState) => state.order.insertedAmount);
    const selectedDrink = useSelector((state: RootState) => state.order.selectedDrink);

    const coffeePrice = selectedDrink !== null ? coffeeProducts[selectedDrink].price : 0;

    useEffect(() => {
        emulator.StartCashin((amount: number) => {
            dispatch(addInsertedAmount(amount));
        });

        return () => {
            emulator.StopCashin(() => {});
        };
    }, [dispatch]);

    const handleFinish = () => {
        if (insertedAmount < coffeePrice) {
            alert(`Недостаточно средств. Вам не хватает еще ${coffeePrice - insertedAmount} руб.`);
            return;
        }
        const change = insertedAmount - coffeePrice;
        dispatch(setChange(change));

        emulator.StopCashin(() => {
            navigate("/preparation");
        });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="cash-container">
            <h2 className="cash-title">Оплата наличными</h2>
            <p className="cash-info">Цена выбранного кофе: {coffeePrice} руб.</p>
            <p className="cash-info">Внесено: {insertedAmount} руб.</p>
            <p className="cash-instructions">
                Используйте клавиши:
                <br />
                1 – 50 руб, 2 – 100 руб, 3 – 200 руб, 4 – 500 руб
            </p>
            <button className="cash-finish-button" onClick={handleFinish}>
                Завершить оплату
            </button>
            <button className="cash-back-button" onClick={handleBack}>
                Вернуться к выбору напитков
            </button>
        </div>
    );
};

export default CashPaymentPage;