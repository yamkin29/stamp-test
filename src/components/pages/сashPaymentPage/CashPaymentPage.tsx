import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import emulator from "../../emulator";
import { coffeeProducts } from "../../products";
import {RootState} from "../../../redux/store";
import {addInsertedAmount, setChange} from "../../../redux/reducers/orderSlice";

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

    return (
        <div>
            <h2>Оплата наличными</h2>
            <p>Цена выбранного кофе: {coffeePrice} руб.</p>
            <p>Внесено: {insertedAmount} руб.</p>
            <p>
                Используйте клавиши:
                <br />
                1 – 50 руб, 2 – 100 руб, 3 – 200 руб, 4 – 500 руб
            </p>
            <br />
            <button onClick={handleFinish}>Завершить оплату</button>
        </div>
    );
};

export default CashPaymentPage;