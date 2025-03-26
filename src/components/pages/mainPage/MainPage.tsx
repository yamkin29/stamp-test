import React from 'react';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './MainPage.css';
import {setSelectedDrink} from "../../../redux/reducers/orderSlice";

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectDrink = (productIndex: number) => {
        dispatch(setSelectedDrink(productIndex));
        navigate("/paypage");
    };

    return (
        <div className="main-container">
            <div className="header-container">
                <Typography variant="h4">Выбор напитка</Typography>
            </div>
            <div className="content-container">
                <button onClick={() => handleSelectDrink(0)}>Кофе 1</button>
                <button onClick={() => handleSelectDrink(1)}>Кофе 2</button>
            </div>
        </div>
    );
};

export default MainPage;