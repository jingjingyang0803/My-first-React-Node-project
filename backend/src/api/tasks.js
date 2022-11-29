const express = require('express');

let tasks = [
    { id: 1, title: 'Shopping for presents', status: false },
    { id: 2, title: 'Write Christmas cards', status: false },
    { id: 3, title: 'Decorate', status: false }
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
    const { id, title } = {...req.body};
    tasks.push({ id, title, status: false});
    res.status(201).json({ message: 'Created' });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = tasks.findIndex((m) => m.id === Number(id));
    const updatedtask = {
        id: Number(id),
        title: tasks[index].title,
        status
    };
    tasks[index] = updatedtask;
    res.status(200).json({ message: 'Updated' });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((m) => m.id !== Number(id));
    res.status(200).json({ message: 'Deleted' });
});

module.exports = router;