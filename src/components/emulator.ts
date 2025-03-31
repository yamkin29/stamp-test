interface Emulator {
    StartCashin: (cb: (amount: number) => void) => void;
    StopCashin: (cb: () => void) => void;
    BankCardPurchase: (cb: (result: boolean) => void, display_cb: (msg: string) => void) => void;
    BankCardCancel: () => void;
    Vend: (cb: (result: boolean) => void) => void;
    _cashinHandler?: ((event: KeyboardEvent) => void) | null;
    _bankCardKeyHandler?: ((event: KeyboardEvent) => void) | null | undefined;
    _bankCardCb?: ((result: boolean) => void) | null | undefined;
    _bankCardDisplayCb?: ((msg: string) => void) | null | undefined;
    _bankCardIntervalId?: number;
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
        emulator.BankCardCancel();

        emulator._bankCardCb = cb;
        emulator._bankCardDisplayCb = display_cb;

        const messages = [
            "Приложите карту",
            "Обработка карты",
            "Связь с банком",
        ];

        let step = 0;
        display_cb(messages[step]);

        const intervalId = window.setInterval(() => {
            step++;
            if (step < messages.length) {
                display_cb(messages[step]);
            } else {
                clearInterval(intervalId);
            }
        }, 1500);
        emulator._bankCardIntervalId = intervalId;

        const keyHandler = (event: KeyboardEvent) => {
            if (event.code === "Digit1") {
                finish(true, "Платёж прошёл успешно");
            } else if (event.code === "Digit2") {
                finish(false, "Платёж отклонён");
            }
        };
        document.addEventListener("keydown", keyHandler);
        emulator._bankCardKeyHandler = keyHandler;

        function finish(result: boolean, finalMessage: string) {
            if (emulator._bankCardIntervalId) {
                clearInterval(emulator._bankCardIntervalId);
                emulator._bankCardIntervalId = undefined;
            }
            document.removeEventListener("keydown", emulator._bankCardKeyHandler!);
            emulator._bankCardKeyHandler = undefined;

            if (emulator._bankCardCb) {
                emulator._bankCardCb(result);
            }
            if (emulator._bankCardDisplayCb) {
                emulator._bankCardDisplayCb(finalMessage);
            }

            emulator._bankCardCb = undefined;
            emulator._bankCardDisplayCb = undefined;
        }
    },
    BankCardCancel: () => {
        if (!emulator._bankCardCb || !emulator._bankCardDisplayCb) {
            return;
        }
        if (emulator._bankCardIntervalId) {
            clearInterval(emulator._bankCardIntervalId);
            emulator._bankCardIntervalId = undefined;
        }
        if (emulator._bankCardKeyHandler) {
            document.removeEventListener("keydown", emulator._bankCardKeyHandler);
            emulator._bankCardKeyHandler = undefined;
        }
        emulator._bankCardCb(false);
        emulator._bankCardDisplayCb("Платёж отменён");

        emulator._bankCardCb = undefined;
        emulator._bankCardDisplayCb = undefined;
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