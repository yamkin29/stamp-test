interface Emulator {
    StartCashin: (cb: (amount: number) => void) => void;
    StopCashin: (cb: () => void) => void;
    BankCardPurchase: (
        cb: (result: boolean) => void,
        display_cb: (msg: string) => void
    ) => void;
    BankCardCancel: () => void;
    Vend: (cb: (result: boolean) => void) => void;
    _cashinHandler?: ((event: KeyboardEvent) => void) | null;
    _bankCardKeyHandler?: ((event: KeyboardEvent) => void) | null | undefined;
    _bankCardCb?: ((result: boolean) => void) | null | undefined;
    _bankCardDisplayCb?: ((msg: string) => void) | null | undefined;
}

const emulator: Emulator = {
    StartCashin: (cb) => {
        const keyHandler = (event: KeyboardEvent) => {
            if (event.code === "Digit1") {
                cb(50);
            } else if (event.code === "Digit2") {
                cb(100);
            } else if (event.code === "Digit3") {
                cb(200);
            } else if (event.code === "Digit4") {
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
        cb();
    },
    BankCardPurchase: (cb, display_cb) => {
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
        } else {
            console.log("Нет активной операции для отмены.");
        }
    },
    Vend: (cb) => {
        setTimeout(() => {
            const keyHandler = (event: KeyboardEvent) => {
                if (event.code === "Digit1") {
                    document.removeEventListener("keydown", keyHandler);
                    cb(true);
                } else if (event.code === "Digit2") {
                    document.removeEventListener("keydown", keyHandler);
                    cb(false);
                }
            };
            document.addEventListener("keydown", keyHandler);
        }, 1000);
    },
};

export default emulator;