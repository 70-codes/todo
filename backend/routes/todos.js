const express = require('express');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');  
const router = express.Router();

// New task
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;
  try {
    const task = new Task({ title, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Get all tasks for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update a task by ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Delete a task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;