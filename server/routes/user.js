const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

let app = express();

const User = require('../models/user');
const { query } = require('express');

app.get('/user', (req, res) => {
  let from = Number(req.query.desde) || 0;
  let limit = Number(req.query.limite) || 5;
  let filter = {  };
  User.find(filter, 'name email role status google')
    .limit(limit)
    .skip(from)
    .exec((err, userDB) => {
      if (err)
        return res.status(500).json({
          ok: true,
          err,
        });

      User.countDocuments(filter, (err, count) => {
        return res.json({
          ok: true,
          users: userDB,
          total: count,
        });
      });
    });
});

app.post('/user', (req, res) => {
  let body = req.body;
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, createdUser) => {
    if (err)
      return res.status(500).json({
        ok: true,
        err,
      });

    // createdUser.password = undefined;
    return res.status(201).json({
      ok: true,
      user: createdUser,
    });
  });
});

app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'role', 'img', 'status']);

  User.findOneAndUpdate(
    { _id: id },
    body,
    { new: true, runValidators: true, context: 'query' },
    (err, userDB) => {
      if (err)
        return res.status(500).json({
          ok: false,
          err,
        });

      if (!userDB) {
        return res.status(404).json({
          ok: false,
          message: 'User not found',
        });
      }

      return res.json({
        ok: true,
        user: userDB,
      });
    }
  );
});

app.delete('/user', (req, res) => {
  res.json('Delete user');
});

module.exports = app;
