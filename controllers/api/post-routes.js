const router = require("express").Router();
const { Post, User, Comment } = require("../../models");




router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_content", "user_id"]
  }).then((dbPostData) => {
    res.json(dbPostData)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get("/:id", (req, res) => {
  Post.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "post_content", "user_id"]
    })
    .then((dbPostData) => {
      if (dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.post("/", (req, res) => {
  Post.create({
    title: "test post",
    body: "test body",
    user_id: "1"
  }).then((dbPostData) => {
    res.json(dbPostData)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })

});

router.put("/", (req, res) => {

});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.id.params
    }
  }).then((dbPostData) => {
    if (dbPostData) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }
    res.json(dbPostData)
  })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
});
module.exports = router;