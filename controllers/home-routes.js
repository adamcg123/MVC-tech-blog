const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "post_content", "user_id"],

        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"]
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"],
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No Post found with this id" });
                return;
            }
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            res.render("homepage", { posts })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
});


router.get('/viewpost/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },


        attributes: ["id", "title", "post_content", "user_id"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["username"]
                    }
                ]
            },
        ],
    }
    )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No Post found avalible" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post)
            res.render("single-post", { post })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/dashboard', (req, res) => {
    Post.findAll({
        // where: {
        //     user_id: "1",
        // },
        attributes: ["id", "title", "post_content", "user_id"],

        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"]
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["username"]
                    }
                ]

            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No Post found " });
                return;
            }
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            res.render("dashboard", { posts })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})
router.get("/post", (req, res) => {
    res.render("create-post");
});

module.exports = router;