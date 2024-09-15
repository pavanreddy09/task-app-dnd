const mongoose = require('mongoose');
const Tasks = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({ email: req.user.email });

    if (tasks) {
      res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

const createTask = async (req, res) => {
    try {
      const { title, description, status, email } = req.body;
      const task = await Tasks.create({ title, description, status, email });
  
      if (task) {
        res.status(201).json({
          message: "Task created Successfully!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong! try again",
        error,
      });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
  
      const updatedTodo = await Tasks.findByIdAndUpdate(id, {
        title,
        description,
        status,
        email: req.user.email,
      });
  
      if (updatedTodo) {
        res.status(200).json({
          message: "Task Updated Successfully!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  };

  const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedTodo = await Tasks.findByIdAndUpdate(id, {
        status,
        email: req.user.email,
      });
  
      if (updatedTodo) {
        res.status(200).json({
          message: "Task Updated Successfully!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }

  const getTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const task = await Tasks.findById(id);
  
      if (task) {
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedtask = await Tasks.deleteOne({ _id: id });
  
      if (deletedtask) {
        res.status(200).json({
          message: "Task deleted Successfully!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  };

module.exports = {
    createTask,
    getTasks,
    updateTask,
    updateStatus,
    getTask,
    deleteTask
}