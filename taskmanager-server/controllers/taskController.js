const Task = require('../models/taskModel');

// Add new task
exports.addTaskController = async (req, res) => {
  console.log("Inside add task controller");

  const { title } = req.body;
  console.log(req.body);

  try {
    if (!title || title.trim() == '') {
      return res.status(400).json("Task title is required");
    }

    const newTask = new Task({
      title,
    });

    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all task
exports.getAllTasksController = async (req, res) => {
  console.log("Inside get all tasks controller");

  try {
    const allTasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update or edit
exports.editTaskController = async (req, res) => {
  console.log("Inside edit task controller");

  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { title },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json("Task not found");
    }

    await updatedTask.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete task
exports.removeTaskController = async (req, res) => {
  console.log("Inside remove task controller");

  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      return res.status(404).json("Task not found");
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Toggle task completion
exports.toggleTaskCompletionController = async (req, res) => {
  console.log("Inside toggle task completion controller");

  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json("Task not found");
    }

    await updatedTask.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get only completed tasks
exports.getCompletedTasksController = async (req, res) => {
  try {
    const completedTasks = await Task.find({ completed: true });
    res.status(200).json(completedTasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching completed tasks", err });
  }
};

//get total task count
exports.getTotalTasksController = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    res.status(200).json({ totalTasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total tasks", error });
  }
};
