// const express = require('express');
// const router = express.Router();
// const taskController = require('./controllers/taskController');

// router.post('/add-task', taskController.addTaskController);
// router.get('/all-task', taskController.getAllTasksController);
// router.put('/:id', taskController.editTaskController);
// router.delete('/remove-task/:id', taskController.removeTaskController);
// router.patch('/:id/complete', taskController.toggleTaskCompletionController);

// router.get('/completed', taskController.getCompletedTasksController);
// router.get('/count/total', taskController.getTotalTasksController);

// module.exports = router;

const express = require('express');
const router = express.Router();
const taskController = require('./controllers/taskController');

//add new task
router.post('/add-task', taskController.addTaskController);
//all tasks
router.get('/all-task', taskController.getAllTasksController);
//update task 
router.put('/:id', taskController.editTaskController);
// delete task
router.delete('/remove-task/:id', taskController.removeTaskController);
//toggle task
router.patch('/:id/complete', taskController.toggleTaskCompletionController);

//get completed tasks
router.get('/completed', taskController.getCompletedTasksController);

// get total task count
router.get('/count/total', taskController.getTotalTasksController);

module.exports = router;
