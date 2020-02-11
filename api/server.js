// import express
const express = require("express");

// import postsRouter
const postsRouter = require("./postsRouter.js");

const server = express();

// middleware
server.use(express.json());
server.use("/api/posts", postsRouter);

// export server
module.exports = server;
