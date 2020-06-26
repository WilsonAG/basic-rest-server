const express = require("express");
const bcrypt = require('bcrypt');

let app = express();

const User = require('../models/user');

app.get("/user", (req, res) => {
  res.json("Get user");
});

app.post("/user", (req, res) => {
  let body = req.body;
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save( (err, createdUser) => {
    if (err) return res.status(500).json({
      ok: true,
      err
    });

    // createdUser.password = undefined;
    return res.status(201).json({
      ok: true,
      user: createdUser
    })
  });
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let query = req.query.name;
  res.json({ user: id, query: query, params: req.body });
});

app.delete("/user", (req, res) => {
  res.json("Delete user");
});


module.exports = app;