const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5501;

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/orderform.html');
});


app.post('/order', (req, res) => {
    const order = req.body;
    let totalAmount = 0;
    let hasErrors = false;
    const items = [
        { name: 'crepes', price: 5.50 },
        { name: 'Waffle', price: 5.50 },
        { name: 'minipancakes', price: 5.50 },
        { name: 'croissant', price: 5.50 },
        { name: 'bagelwcc', price: 5.50 },
        { name: 'Burrito', price: 5.50 },
        { name: 'ChickenBiscuit', price: 5.50 },
        { name: 'Shawarma', price: 7.50 },
        { name: 'Pasta Bowl', price: 7.50 },
        { name: 'Sandwiches', price: 7.50 },
        { name: 'Soup', price: 7.50 },
        { name: 'SaladRice', price: 7.50 },
        { name: 'Burrito13', price: 7.50 },
        { name: 'Pizza', price: 7.50 },
        { name: 'BanhMi', price: 10.50 },
        { name: 'LasagnaSlice', price: 10.50 },
        { name: 'ButterChicken', price: 10.50 },
        { name: 'MongolianBeef', price: 10.50 },
        { name: 'HotChicken', price: 10.50 },
        { name: 'ChoppedCheese', price: 10.50 },
        { name: 'Wings', price: 10.50 },
        { name: 'SodaCan', price: 3.50 },
        { name: 'coffee', price: 3.50 },
        { name: 'Espresso', price: 3.50 },
        { name: 'Chai', price: 3.50 },
        { name: 'Cake', price: 3.50 },
        { name: 'icecream', price: 3.50 },
        { name: 'Lassi', price: 3.50 },
       
    ]
    for (const itemName in order) {
        const item = items.find(item => item.name === itemName);
        if (item) {
            const quantity = parseInt(order[itemName]) || 0;
            if (quantity < 0) {
                hasErrors = true;
                break;
            }
            totalAmount += item.price * quantity;
        }
    }
    if (hasErrors) {
        res.status(400).send('Error: Item quantities cannot be negative.');
    } else {
        res.redirect('/confirmation?total=' + totalAmount.toFixed(2));
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
