const express = require("express");
const projectmodel = require("../data/helpers/projectModel");

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;
  projectmodel.get(id).then(id => {
    if (id) {
      next();
    } else {
      res.status(404).send({ error: "The ID doesn't exist." });
    }
  });
}

//endpoints

router.get("/", (req, res) => {
  projectmodel
    .get()
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(() =>
      res.send(500).send({ error: "The projects could not be retrieved." })
    );
});

router.get("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  projectmodel
    .get(id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(() =>
      res.status(500).send({ error: "The projects could not be retrieved." })
    );
});

router.get("/:id/actions", checkIdExists, (req, res) => {
  const id = req.params.id;
  projectmodel
    .getProjectActions(id)
    .then(actions => {
      res.status(200).send({ actions });
    })
    .catch(() =>
      res.status(500).send({ error: "The actions could not be retrieved." })
    );
});

router.post("/create", (req, res) => {
  const projectInfo = req.body;

  projectmodel
    .insert(projectInfo)
    .then(result => {
      projectmodel
        .get(result.id)
        .then(project => {
          res.status(201).send({ project });
        })
        .catch(() =>
          res.status(400).send({
            errorMessage: "Please provide information in the correct format."
          })
        );
    })
    .catch(() =>
      res.status(500).send({
        error: "There was an error saving the project to the database."
      })
    );
});

router.put("/:id/update", checkIdExists, (req, res) => {
  const id = req.params.id;

  projectmodel
    .update(id, projectChange)
    .then(result => res.status(200).send({ result }))
    .catch(() =>
      res
        .status(400)
        .send({ errorMessage: "Please provide updated information." })
    )
    .catch(() =>
      res.status(500).send({ error: "The post could not be modified." })
    );
});

router.delete("/:id/delete", checkIdExists, (req, res) => {
  const id = req.params.id;

  projectmodel
    .remove(id)
    .then(() =>
      res.status(200).send({ deleted: "One project has been deleted." })
    )
    .catch(() =>
      res.status(500).send({ error: "The post could not be deleted." })
    );
});

module.exports = router;
