const express = require("express");
const router = express.Router();
const { getTasks, postUser,loginUser, postTodo, getTodo, deleteTodo
 } = require("./controlers.js");

router.get("/test", (req, res) => {
  res.send("Router works!");
});

router.post("/", postUser);
router.post("/login",loginUser)
router.post("/tasks",postTodo)
router.get("/tasks",getTodo)
router.delete("/tasks/:id",deleteTodo)

module.exports = router;
