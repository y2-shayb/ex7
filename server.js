const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 1337;
const recepiesUrl = 'https://recipes-goodness.herokuapp.com/recipes/';
global.counter = 0;

const middleware = (req, res, next) => {
    if (counter >= 5) {
        res.status(400).send({error: "Too many requests"});
        res.end();
    } else {
        next();
    }
};

app.get('/recipe/:ingredient', middleware, async (req,res) => {
    counter++;
    const ingredient = req.params.ingredient;
    try {
        const { data } = await axios.get(`${recepiesUrl}${ingredient}`);

        if (!data.results || !data.results.length) {
            res.send({ empty: true });
        }

        const top = [];
        let count = 0;

        while (count < 3 && data.results[count]) {
            count++;
            top.push(data.results[count]);
        }

        res.send(top);
    } catch (e) {
        res.status(500).res.send('error occured');
    }
});


app.listen(port, () => {
    console.log('ex7 is running!! ! ! ');
});