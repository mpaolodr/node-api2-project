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

// GET requests to /api/posts/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified id does not exist." });
    });
});

// POST /api/posts
router.post("/", (req, res) => {
  const postData = req.body;

  if (postData.title && postData.contents) {
    Posts.insert(postData)
      .then(added => {
        Posts.findById(added.id)
          .then(addedPost => {
            res.status(201).json(addedPost);
          })
          .catch(err => {
            res.status(500).json({ error: "Cannot retrieve post" });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database"
          });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// export
module.exports = router;
