const express = require('express');
const bodyParser = require('body-parser');
require('./config/env');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json('Get user')
});
app.post('/user', (req, res) => {

    let body = req.body;
    if (!body.name ) {
        return res.status(400).json({ err: true, message: 'El nombre es necesario.'});
    }
    res.json({
        body: req.body
    })
});
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let query = req.query.name;
    res.json({ 'user': id, query: query, params: req.body })
});
app.delete('/user', (req, res) => {
    res.json('Delete user')
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
});