/**
 * Dump Data
 */
var initialItems = [
    { id: 1, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 },
    { id: 2, name: "Jacket", description: "Brand new jacket", price: 75.50 },
    { id: 3, name: "Car", description: "Brand new car", price: 7750 },
    { id: 4, name: "Watch", description: "Brand new watch", price: 110.99 },
    { id: 5, name: "Car", description: "Brand new car", price: 7750 },
    { id: 6, name: "Watch", description: "Brand new watch", price: 110.99 },
    { id: 7, name: "Jacket", description: "Brand new jacket", price: 75.50 },
    { id: 8, name: "Mobile Phone", description: "Brand new mobile phone", price: 750 },
];

var appStore = Redux.createStore(
    appReducer,
    {
        homePageAllItems: initialItems,
        previewScreenCurrentItem: {},
        isPreviewScreenShown: false
    }
);