const { User } = require("../../models");

const router = require("express").Router();


router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username", "email", "password"]
  }).then((dbUserData) => {
    res.json(dbUserData)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get("/:id", (req, res) => {
  User.findOne(
    {
      where: {
        id: req.params.id
      },
    },
    {
      attributes: ["id", "username", "email", "password"]
    })
    .then((dbUserData) => {
      if (dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((dbUserData) => {
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })

});

router.put("/", (req, res) => {

});

router.delete("/", (req, res) => {
  User.destroy({
    where: {
      id: req.id.params
    }
  }).then((dbUserData) => {
    if (dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbUserData)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});
module.exports = router;