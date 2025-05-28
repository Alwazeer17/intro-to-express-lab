const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Express Lab!');
});

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`What a delight it is to see you once more, ${username}.`);
});

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number)) {
        res.send("You must specify a number.");
    } else {
        const rolled = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${rolled}.`);
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < 0 || index >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let result = shoes;

    const min = parseFloat(req.query["min-price"]);
    const max = parseFloat(req.query["max-price"]);
    const type = req.query.type;

    if (!isNaN(min)) {
        result = result.filter(shoe => shoe.price >= min);
    }

    if (!isNaN(max)) {
        result = result.filter(shoe => shoe.price <= max);
    }

    if (type) {
        result = result.filter(shoe => shoe.type === type);
    }

    res.send(result);
});

app.get('/hello', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`Hello there, ${name}! I hear you are ${age} years old!`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
