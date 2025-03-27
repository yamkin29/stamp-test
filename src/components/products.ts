export interface CoffeeProduct {
    id: number;
    name: string;
    price: number;
    icon: string;
}

export const coffeeProducts: CoffeeProduct[] = [
    { id: 0, name: "Американо", price: 150, icon: "/assets/icons/americano.jpg" },
    { id: 1, name: "Эспрессо", price: 200, icon: "/assets/icons/espresso.jpg" },
    { id: 2, name: "Латте", price: 180, icon: "/assets/icons/latte.jpg" },
    { id: 3, name: "Макиато", price: 220, icon: "/assets/icons/macchiato.jpg" },
    { id: 4, name: "Американо", price: 170, icon: "/assets/icons/americano.jpg" },
    { id: 5, name: "Американо", price: 210, icon: "/assets/icons/americano.jpg" },
];