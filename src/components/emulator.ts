interface Emulator {
    StartCashin: (cb: (amount: number) => void) => void;
    StopCashin: (cb: () => void) => void;
    BankCardPurchase: (
        amount: number,
        cb: (result: boolean) => void,
        display_cb: (msg: string) => void
    ) => void;
    BankCardCancel: () => void;
    Vend: (product_idx: number, cb: (result: boolean) => void) => void;
    _cashinHandler?: ((event: KeyboardEvent) => void) | null;
    _bankCardKeyHandler?: ((event: KeyboardEvent) => void) | null | undefined;
    _bankCardCb?: ((result: boolean) => void) | null | undefined;
    _bankCardDisplayCb?: ((msg: string) => void) | null | undefined;
}

const emulator: Emulator = {
    StartCashin: (cb) => {
        console.log(
            "Купюроприёмник включён. Используйте клавиши 1 (50 руб), 2 (100 руб), 3 (200 руб), 4 (500 руб) для внесения купюр."
        );
        const keyHandler = (event: KeyboardEvent) => {
            if (event.code === "Digit1") {
                console.log("Внесено 50 руб.");
                cb(50);
            } else if (event.code === "Digit2") {
                console.log("Внесено 100 руб.");
                cb(100);
            } else if (event.code === "Digit3") {
                console.log("Внесено 200 руб.");
                cb(200);
            } else if (event.code === "Digit4") {
                console.log("Внесено 500 руб.");
                cb(500);
            }
        };
        document.addEventListener("keydown", keyHandler);
        emulator._cashinHandler = keyHandler;
    },
    StopCashin: (cb) => {
        if (emulator._cashinHandler) {
            document.removeEventListener("keydown", emulator._cashinHandler);
            emulator._cashinHandler = null;
        }
        console.log("Приём купюр отключён.");
        cb();
    },
    BankCardPurchase: (amount, cb, display_cb) => {
        display_cb("Приложите карту");
        setTimeout(() => {
            display_cb("Обработка карты");
            setTimeout(() => {
                display_cb("Связь с банком");
                setTimeout(() => {
                    display_cb("Нажмите 1 для успешной транзакции, 2 для неуспешной");
                    const keyHandler = (event: KeyboardEvent) => {
                        if (event.code === "Digit1") {
                            document.removeEventListener("keydown", keyHandler);
                            emulator._bankCardKeyHandler = null;
                            emulator._bankCardCb = null;
                            emulator._bankCardDisplayCb = null;
                            cb(true);
                            display_cb("Платеж прошёл успешно");
                        } else if (event.code === "Digit2") {
                            document.removeEventListener("keydown", keyHandler);
                            emulator._bankCardKeyHandler = null;
                            emulator._bankCardCb = null;
                            emulator._bankCardDisplayCb = null;
                            cb(false);
                            display_cb("Платеж отклонён");
                        }
                    };
                    document.addEventListener("keydown", keyHandler);
                    emulator._bankCardKeyHandler = keyHandler;
                    emulator._bankCardCb = cb;
                    emulator._bankCardDisplayCb = display_cb;
                }, 1000);
            }, 1000);
        }, 1000);
    },
    BankCardCancel: () => {
        if (emulator._bankCardKeyHandler && emulator._bankCardCb && emulator._bankCardDisplayCb) {
            document.removeEventListener("keydown", emulator._bankCardKeyHandler);
            emulator._bankCardKeyHandler = null;
            emulator._bankCardCb(false);
            emulator._bankCardDisplayCb("Платеж отменён");
            emulator._bankCardCb = null;
            emulator._bankCardDisplayCb = null;
            console.log("Операция по банковской карте отменена.");
        } else {
            console.log("Нет активной операции для отмены.");
        }
    },
    Vend: (product_idx, cb) => {
        console.log("Начато приготовление напитка с индексом:", product_idx);
        setTimeout(() => {
            console.log("Нажмите 1 для успешной выдачи, 2 для неуспешной выдачи");
            const keyHandler = (event: KeyboardEvent) => {
                if (event.code === "Digit1") {
                    document.removeEventListener("keydown", keyHandler);
                    cb(true);
                    console.log("Напиток выдан успешно");
                } else if (event.code === "Digit2") {
                    document.removeEventListener("keydown", keyHandler);
                    cb(false);
                    console.log("Ошибка при выдаче напитка");
                }
            };
            document.addEventListener("keydown", keyHandler);
        }, 1000);
    },
};

export default emulator;