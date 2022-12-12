const express = require('express');

let tasks = [
    { id: 1, name: 'Shopping for presents', done: false },
    { id: 2, name: 'Write Christmas cards', done: false },
    { id: 3, name: 'Decorate', done: false }
];

const router = express.Router();

// get the list of current tasks
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// get a specific task in the list via id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find((m) => m.id === Number(id));
    if (task === undefined)
        res.status(404).json({ message: 'Not found' });
    else
        res.status(200).json(task);
});

// update the current task list when user load another list
router.post('/load', (req, res) => {
    tasks = req.body;
    res.status(200).json(tasks);
});

// add a new task to the current lsit
router.post('/', (req, res) => {
    const { id, name, done } = req.body;
    tasks.push({ id, name, done });
    res.status(200).json(tasks);
});

// mark a task done/undone when user click its checkbox
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((m) => m.id === Number(id));
    const updatedtask = {
        id: Number(id),
        name: tasks[index].name,
        done: !tasks[index].done
    };
    tasks[index] = updatedtask;
    res.status(200).json(tasks);
});

// delete a task when user click remove button
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((m) => m.id !== Number(id));
    res.status(200).json(tasks);
});

// batch mark all the tasks as done/undone
router.patch('/batchMark/:flag', (req, res) => {
    const { flag } = { ...req.params };
    tasks = tasks.map((m) => { return { ...m, done: flag === "true" ? true : false }; });
    res.status(200).json(tasks);
});

// delete all the completed tasks when user click the 'clear completed tasks' button
router.delete('/', (req, res) => {
    tasks = tasks.filter((m) => m.done === false);
    res.status(200).json(tasks);
});

module.exports = router;