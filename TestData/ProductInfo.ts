import { Data } from "dataclass";

class Item extends Data {
    id: number = 0;
    name: string = "Sauce Labs Backpack";
    description: string = "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";
    price: string = "$29.99";
    tax: string = "$2.40";
    totalPrice: string = "$32.39";
}

export const item = Item.create();
export const lowestPriceItem = Item.create({id: 1, name: "Sauce Labs Onesie", description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", price: "$7.99", totalPrice: "$7.99"});
export const highestPriceItem = Item.create({id: 2, name: "Sauce Labs Fleece Jacket", description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", price: "$49.99", totalPrice: "$49.99"});
export const itemForZASorting = Item.create({id: 3, name: "Test.allTheThings() T-Shirt (Red)", description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.", price: "$15.99", totalPrice: "$15.99"});