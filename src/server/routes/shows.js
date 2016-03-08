var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
}

router.get('/shows', function(req, res, next) {
  // res.status(200).json('testing');
  Shows().select().then(function(result) {
    res.status(200).json(result);
  });
});

router.get('/show/:id', function(req, res, next) {
  // res.status(200).json('testing');
  Shows().select().where('id', req.params.id).then(function(result) {
    res.status(200).json(result);
  });
});

router.post('/shows', function(req, res, next) {
  Shows().insert(req.body, 'id')
    .then(function(result) {
      res.status(200).json(result);
  });
});

router.post('/shows', function(req, res, next) {
  Shows().insert(req.body, 'id')
    .then(function(result) {
      res.status(200).json(result);
  });
});

module.exports = router;
