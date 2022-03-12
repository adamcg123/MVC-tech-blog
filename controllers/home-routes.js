const router = require("express").Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

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
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// router.get('/viewpost/:id', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },


//         attributes: ["id", "title", "post_content", "user_id"],
//         include: [
//             {
//                 model: User,
//                 as: "user",
//                 attributes: ["username"],
//             },
//             {
//                 model: Comment,
//                 as: "comments",
//                 attributes: ["id", "comment_text", "user_id"],
//                 include: [
//                     {
//                         model: User,
//                         as: "user",
//                         attributes: ["username"]
//                     }
//                 ]
//             },
//         ],
//     }
//     )
//         .then((dbPostData) => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: "No Post found avalible" });
//                 return;
//             }
//             // const post = dbPostData.get({ plain: true });
//             // console.log(post)
//             // const myPost = post.user_id == req.session.user_id;
//             // res.render("single-post", {
//             //     post,
//             //     loggedIn: req.session.loggedIn,
//             //     currentUser: myPost,
//             // })
//         })
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json(err)
//         })
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        console.log('already logged in')
        return;
    }

    res.render('login');
});

// router.get('/dashboard', (req, res) => {
//     Post.findAll({
//         where: {
//             user_id: req.body.user_id,
//         },
//         attributes: ["id", "title", "post_content", "user_id"],

//         include: [
//             {
//                 model: User,
//                 as: "user",
//                 attributes: ["username"]
//             },
//             {
//                 model: Comment,
//                 as: "comments",
//                 attributes: ["id", "comment_text", "user_id"],
//                 include: [
//                     {
//                         model: User,
//                         as: "user",
//                         attributes: ["username"]
//                     }
//                 ]

//             },
//         ],
//     })
//         .then((dbPostData) => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: "No Post found " });
//                 return;
//             }
//             const posts = dbPostData.map((post) => post.get({ plain: true }));
//             console.log(posts);
//             res.render("dashboard",
//                 // { posts, loggedIn: req.session.loggedIn }
//             )
//         })
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json(err)
//         })
// })
// router.get("/post", (req, res) => {
//     res.render("create-post",
//         // { loggedIn: req.session.loggedIn }
//     );
// });

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at',

        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('single-post', { post });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;