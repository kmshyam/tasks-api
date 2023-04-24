const Task = require("../models/task-schema");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findOne({ _id: id });
    res.status(200).send(task);
  } catch (err) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
};

exports.postTasks = async (req, res) => {
  try {
    const tasks = req.body.tasks;
    if (tasks !== undefined) {
      tasks.forEach(async (element) => {
        await Task.create({
          title: element.title,
          is_completed: element.is_completed,
        });
      });
      res.status(201).json({
        status: "Success",
        message: "All the tasks added successfully.",
      });
    } else {
      const task = await Task.create({
        title: req.body.title,
        is_completed: req.body.is_completed,
      });
      res.status(201).json({
        id: task._id,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.updateOne({ _id: id }, req.body);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.deleteOne({ _id: id });
    res.status(204).send();
  } catch (err) {
    res.status(204).send();
  }
};

exports.deleteAllTasks = async (req, res) => {
  const tasks = req.body.tasks;
  tasks.forEach(async (task) => {
    await Task.deleteOne({ _id: task.id });
  });
  res.status(204).send();
};
