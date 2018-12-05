const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function(collection){

  const router = express.Router();

  //INDEX
  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((documents) => res.json(documents))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status: 500, error: error});
    });
  });

  // CREATE
  router.post('/', (req, res) => {
    const newData = req.body;
    collection.insertOne(newData)
    .then(() => collection.find().toArray())
    .then((documents) => res.json(documents))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status: 500, error: error});
    });
  });



  return router;
};

module.exports = createRouter;
