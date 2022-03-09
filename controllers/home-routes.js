const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Home page route");
});

module.exports = router;