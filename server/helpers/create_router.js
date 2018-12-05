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

  // DELETE
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectId(id)})
    .then(() => collection.find().toArray())
    .then((documents) => res.json(documents))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status: 500, error: error});
    });
  });

// UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection.updateOne({_id: ObjectId(id)}, {$set: updatedData})
    .then(() => collection.find().toArray())
    .then((documents) => res.json(documents))
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.json({status: 500, error: error});
    });
  });

  // // COMPLETE
  //   router.put('/:id/:completed', (req, res) => {
  //     const id = req.params.id;
  //     const completed = req.params.completed;
  //     // const updatedData = req.body;
  //     collection.updateOne({_id: ObjectId(id)}, {$set: {"done": completed  }})
  //     .then(() => collection.find().toArray())
  //     .then((documents) => res.json(documents))
  //     .catch((error) => {
  //       console.error(error);
  //       res.status(500);
  //       res.json({status: 500, error: error});
  //     });
  //   });

  return router;
};

module.exports = createRouter;
