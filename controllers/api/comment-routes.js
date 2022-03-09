const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    Comment.findAll({
        attributes: ["id", "comment_text", "user_id"]
    }).then((dbCommentData) => {
        res.json(dbCommentData)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.get("/:id", (req, res) => {
    Comment.findOne(
        {
            where: {
                id: req.params.id
            },
        },
        {
            attributes: ["id", "comment_text", "user_id"]
        })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(dbCommentData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.post("/", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then((dbCommentData) => {
            res.json(dbCommentData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.put('/:id', (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
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
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then((dbCommentData) => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbCommentData)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
});
module.exports = router;