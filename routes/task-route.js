const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskController.getTaskById);

router.post("/", TaskController.postTasks);

router.put("/:id", TaskController.updateTask);

router.delete("/", TaskController.deleteAllTasks);

router.delete("/:id", TaskController.deleteTask);

module.exports = router;
