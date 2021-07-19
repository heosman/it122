
let fruits = [
    { fruitname : "grapes", price : 4.39, quantity : 2, unit : "lbs" },
    { fruitname : "apples", price : 1.00, quantity : 6, unit : "each" },
    { fruitname : "noranges", price : 1.58, quantity : 1, unit : "lbs" },
    { fruitname : "cherries", price : 2.29, quantity : 2, unit : "lbs" },
    { fruitname : "pears", price : 1.58, quantity : 1, unit : "lbs" }
    ];

/* let getAll = fruits.filter((fruit) => {
    return('Name: ' + fruit.fruitName + ' - Price: ' + fruit.price + ' - Quantity: ' + fruit.quantity + ' - Unit: ' + fruit.unit);
});  */

const getAll = () => {
    return fruits;
}

const getItem = (fruitname) => {
    return fruits.find((fruit) => {
        return fruit.fruitname == fruitame;
});
};

export { getAll, getItem };