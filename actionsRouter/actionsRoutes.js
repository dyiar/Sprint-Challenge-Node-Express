const express = require("express");
const actiondb = require("../data/helpers/actionModel");

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;

  actiondb.get(id).then(id => {
    if (id) {
      next();
    } else {
      res.status(404).send({ error: "The ID doesn't exist." });
    }
  });
}

//endpoints

router.get("/", (req, res) => {
  actiondb
    .get()
    .then(action => {
      res.status(200).send({ action });
    })
    .catch(() =>
      res.status(500).send({ error: "The actions could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  actiondb
    .get(id)
    .then(action => {
      res.status(200).send({ action });
    })
    .catch(() =>
      res.status(500).send({ error: "The actions could not be retrieved." })
    );
});

router.post("/create", (req, res) => {
  const actionInfo = req.body;

  actiondb
    .insert(actionInfo)
    .then(result => {
      actiondb
        .get(result.id)
        .then(action => {
          res.status(201).send({ action });
        })
        .catch(() =>
          res.status(400).send({
            errorMessage: "Please provide information in the correct format."
          })
        );
    })
    .catch(() =>
      res.status(500).send({
        error: "There was an error while saving the action to the database."
      })
    );
});

router.put("/:id/update", checkIdExists, (req, res) => {
  const id = req.params.id;
  const actionChange = req.body;

  actiondb
    .update(id, actionChange)
    .then(result => res.status(200).send({ result }))
    .catch(() =>
      res
        .status(400)
        .send({ errorMessage: "Please provide updated information." })
    )
    .catch(() =>
      res.status(500).send({ error: "The action could not be modified." })
    );
});

router.delete("/:id/delete", checkIdExists, (req, res) => {
  const id = req.params.id;

  actiondb
    .remove(id)
    .then(() =>
      res.status(200).send({ response: "One record has been deleted." })
    )
    .catch(() =>
      res.status(500).send({ error: "The action could not be deleted." })
    );
});

module.exports = router;
