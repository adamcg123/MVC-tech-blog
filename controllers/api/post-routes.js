
const { Post, User, Comment } = require("../../models");
const router = require("express").Router();



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
    },
    {
      attributes: ["id", "title", "post_content", "user_id"],
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
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
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.body.user_id
  })
    .then((dbPostData) => {
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })

});

router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'no comment with that id was found' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then((dbPostData) => {
    if (!dbPostData) {
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