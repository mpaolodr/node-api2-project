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
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// GET /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(result => {
      Posts.findPostComments(result[0].id)
        .then(comments => {
          if (comments.length !== 0) {
            res.status(200).json(comments);
          } else {
            res.status(204).json({ message: "No Comments Available" });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: "The comments information could not be retrieved."
          });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified id does not exist" });
    });
});

// POST /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const commentData = { ...req.body, post_id: id };

  Posts.findById(id)
    .then(post => {
      if (commentData.text) {
        Posts.insertComment(commentData)
          .then(result => {
            Posts.findCommentById(result.id)
              .then(newComment => {
                res.status(201).json(newComment);
              })
              .catch(err => {
                res
                  .status(404)
                  .json({ message: "No Comment found by that id" });
              });
          })
          .catch(err => {
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            });
          });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
    .then(post => {
      Posts.remove(id)
        .then(deleted => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed" });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

//  PUT /api/posts/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Posts.findById(id)
    .then(post => {
      if (updatedData.title && updatedData.contents) {
        Posts.update(post[0].id, updatedData)
          .then(updated => {
            Posts.findById(post[0].id)
              .then(updatedPost => {
                res.status(200).json(updatedPost);
              })
              .catch(err => {
                res.status(500).end();
              });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// export
module.exports = router;
