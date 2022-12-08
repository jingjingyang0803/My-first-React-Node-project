const express = require('express');

let tasks = [
    { id: 1, name: 'Shopping for presents', done: false },
    { id: 2, name: 'Write Christmas cards', done: false },
    { id: 3, name: 'Decorate', done: false }
];

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find((m) => m.id === Number(id));
    if (task === undefined)
        res.status(404).json({ message: 'Not found' });
    else
        res.status(200).json(task);

});

router.post('/', (req, res) => {
    const { id, name, done } = req.body;
    tasks.push({ id, name, done });
    res.status(200).json(tasks);
});

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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((m) => m.id !== Number(id));
    res.status(200).json(tasks);
});

router.patch('/batchMark/:flag', (req, res) => {
    const { flag } = { ...req.params };
    tasks = tasks.map((m) => { return { ...m, done: flag === "true" ? true : false }; });
    res.status(200).json(tasks);
});

router.delete('/', (req, res) => {
    tasks = tasks.filter((m) => m.done === false);
    res.status(200).json(tasks);
});

module.exports = router;