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

router.post('/:name', (req, res) => {
    const { name } = req.params;
    const newtask = {
        id: Date.now(),
        name: name,
        done: false
    };
    tasks.push(newtask);
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

router.patch('/mark/:flag', (req, res) => {
    const { flag } = { ...req.params };
    tasks = tasks.map((m) => { return { ...m, done: flag === "true" ? true : false }; });
    res.status(200).json(tasks);
});

router.delete('/', (req, res) => {
    tasks = tasks.filter((m) => m.done === false);
    res.status(200).json(tasks);
});

module.exports = router;