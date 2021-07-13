
let fruits = [
    { fruitName : "green grapes", price : 4.39, quantity : 2, unit : "lbs" },
    { fruitName : "gala apples", price : 1.00, quantity : 6, unit : "each" },
    { fruitName : "navel oranges", price : 1.58, quantity : 1, unit : "lbs" },
    { fruitName : "red cherries", price : 2.29, quantity : 2, unit : "lbs" },
    { fruitName : "pears", price : 1.58, quantity : 1, unit : "lbs" }
    ];


const getAll = fruits.map((fruit) => {
    return('Name: ' + fruit.fruitName + ' - Price: ' + fruit.price + ' - Quantity: ' + fruit.quantity + ' - Unit: ' + fruit.unit);
});


/* let getItem = (name) => {
    return fruits.find((fruit) => {
        return fruit.name === name;
    })
} */

const getItem = (nameFruit) => {
    return fruits.find((fruitName) => {
        return fruitName.fruitName == nameFruit;
});
}


export {getAll, getItem};