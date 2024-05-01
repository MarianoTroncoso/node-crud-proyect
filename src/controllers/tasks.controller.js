import Task from '../models/task.model.js';
import {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  TASK_NOT_FOUND,
  NO_CONTENT_STATUS_CODE,
} from './constants.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate('user');

    res.json(tasks);
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const foundTask = await Task.findById(id).populate('user');

    if (!foundTask) {
      return res.status(NOT_FOUND_STATUS_CODE).json({
        error: TASK_NOT_FOUND,
      });
    }

    res.json(foundTask);
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const foundTask = await Task.findByIdAndDelete(id);

    if (!foundTask) {
      return res.status(NOT_FOUND_STATUS_CODE).json({
        error: TASK_NOT_FOUND,
      });
    }

    return res.sendStatus(NO_CONTENT_STATUS_CODE);
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const newTaskData = req.body;

    const foundTask = await Task.findByIdAndUpdate(id, newTaskData, {
      new: true,
    });

    if (!foundTask) {
      return res.status(NOT_FOUND_STATUS_CODE).json({
        error: TASK_NOT_FOUND,
      });
    }

    res.json(foundTask);
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};
