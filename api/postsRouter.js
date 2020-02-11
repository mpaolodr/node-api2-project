// create server
const router = require("express").Router();

// import data
const Posts = require("../data/db.js");

// GET requests to /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There posts information could not be retrieved" });
    });
});

// export
module.exports = router;
