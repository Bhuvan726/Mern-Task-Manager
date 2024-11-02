const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);

module.exports = router;
