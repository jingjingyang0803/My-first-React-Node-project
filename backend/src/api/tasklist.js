const express = require('express');
const todolist = require('./models/todolist');

const router = express.Router();

const TodoList = require('./models/todolist');// instantiate model Todolist

// see all the task lists stored in the database
router.get('/', async (req, res) => {
    try {
        const todolists = await TodoList.find({});
        res.status(200).json(todolists);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// save a new task list
router.post('/', async (req, res) => {
    const todoList = new TodoList({ todos: req.body });
    try {
        const newtodolist = await todoList.save();
        for (var key in newtodolist)
            if (key == '_id')
                res.send(newtodolist[key]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// get a specific task list
router.get('/:id', async (req, res) => {
    // get ids of all the task lists stored in the database
    if (req.params.id == 'ids') {
        try {
            const todolists = await TodoList.find({});
            const ids = [];
            for (var i = 0; i < todolists.length; i++) {
                console.log(todolists[i]);
                for (var key in todolists[i])
                    if (key == '_id')
                        ids.push(todolists[i][key]);
            }
            res.status(200).json(ids);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    else {
        try {
            const todolist = await TodoList.findOne({ _id: req.params.id }, { _id: 0, todos: 1 });
            for (var key in todolist)
                if (key == 'todos')
                    res.send(todolist[key]);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
});

// update a specific task list
router.put("/:id", async (req, res) => {
    try {
        const updatedtodolist = await TodoList.findOneAndUpdate({ _id: req.params.id }, { todos: req.body }, { new: true });
        for (var key in updatedtodolist)
            if (key == 'todos')
                res.send(updatedtodolist[key]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// delete a specific task list
router.delete("/:id", async (req, res) => {
    try {
        const deletedtodolist = await TodoList.findByIdAndDelete(req.params.id);
        for (var key in deletedtodolist)
            if (key == 'todos')
                res.send(deletedtodolist[key]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


module.exports = router;