let fruits = [
    { fruitname : "grapes", price : 4.39, quantity : 2, unit : "lbs" },
    { fruitname : "apples", price : 1.00, quantity : 6, unit : "each" },
    { fruitname : "oranges", price : 1.58, quantity : 1, unit : "lbs" },
    { fruitname : "cherries", price : 2.29, quantity : 2, unit : "lbs" },
    { fruitname : "pears", price : 1.58, quantity : 1, unit : "lbs" }
    ];

const getAll = () => {
    return fruits;
}

const getItem = (fruitname) => {
    return fruits.find((fruit) => {
        return fruit.fruitname == fruitname;
});
};

export { getAll, getItem };