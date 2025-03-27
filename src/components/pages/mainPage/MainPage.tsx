import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './MainPage.css';
import {setSelectedDrink} from "../../../redux/reducers/orderSlice";
import {coffeeProducts} from "../../products";

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectDrink = (productIndex: number) => {
        dispatch(setSelectedDrink(productIndex));
        navigate("/paypage");
    };

    return (
        <div className="main-container">
            <header className="header-container">
                <h1>Выбор напитка</h1>
            </header>
            <div className="grid-container">
                {coffeeProducts.map((drink) => (
                    <div
                        key={drink.id}
                        className="drink-tile"
                        onClick={() => handleSelectDrink(drink.id)}
                    >
                        <img src={drink.icon} alt={drink.name} className="drink-icon" />
                        <div className="drink-name">{drink.name}</div>
                        <div className="drink-price">{drink.price} руб.</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;