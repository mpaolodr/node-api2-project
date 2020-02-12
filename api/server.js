// import express
const express = require("express");
const cors = require("cors");

// import postsRouter
const postsRouter = require("../routers/postsRouter.js");

const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.sendStatus(200);
});

// export server
module.exports = server;
