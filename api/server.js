// import express
const express = require("express");

const server = express();

// middleware
server.use(express.json());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.status(200).json({});
});

// export server
module.exports = server;
