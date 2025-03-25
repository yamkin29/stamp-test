import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import './MainPage.css'
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    const buttonClick = () => {
        navigate("/paypage");
    }

    return (
        <div className={'main-container'}>
            <div className={'header-container'}>
                <Typography>
                    Выбор напитка
                </Typography>
            </div>
            <div className={'content-container'}>
                <button onClick={buttonClick}>
                    Кофе 1
                </button>
                <button>
                    Кофе 2
                </button>
            </div>
        </div>
    );
};

export default MainPage;