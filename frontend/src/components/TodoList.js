import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Header from "./Header";
import List from "./List";
import Footer from "./Footer";
import "./TodoList.css";

const url = `${process.env.REACT_APP_BACKEND}v1/tasks/`;
const url2 = `${process.env.REACT_APP_BACKEND}/v1/task/list/`;

export default function Todolist() {
    // ********************add, mark, delete task********************

    const [items, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const onInsertItem = async (name) => {
        const newItem = {
            id: uuid(),
            name: name,
            done: false
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });
        const data = await response.json();
        setTasks(data);
    };

    const onUpdateItem = async (id) => {
        const response = await fetch(url + id, { method: 'PATCH' });
        const data = await response.json();
        setTasks(data);
    };

    const onDeleteItem = async (id) => {
        const response = await fetch(url + id, { method: 'DELETE' });
        const data = await response.json();
        setTasks(data);
    };

    const onBatchChange = async (flag) => {
        const response = await fetch(url + "batchMark/" + flag, { method: 'PATCH' });
        const data = await response.json();
        setTasks(data);
    };

    const onClearAllDone = async () => {
        const response = await fetch(url, { method: 'DELETE' });
        const data = await response.json();
        setTasks(data);
    };

    //********************save, load, update list********************

    const onClickSave = async () => {
        const response = await fetch(url2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items)
        });
        const newid = await response.json();
        alert("A new task list with ID number " + newid + " has been created!");

        const r = await fetch(url2 + 'ids');
        const data = await r.json();
        setOptions(data);
    };

    const onClickLoad = async (id) => {
        // alert("The task list with ID number " + id + " will be load!");
        const response = await fetch(url2 + id);
        const taskList = await response.json();
        setTasks(taskList);

        await fetch(url + 'load', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskList)
        });
    };

    const onClickUpdate = async (id) => {
        // alert("The task list with ID number " + id + " has been updated!");
        const response = await fetch(url2 + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items)
        });
        const updatedtaskList = await response.json();
        console.log(updatedtaskList);
    };

    const onClickDelete = async (id) => {
        // alert("The task list with ID number " + id + " will be deleted!");
        const response = await fetch(url2 + id, { method: 'DELETE' });
        const deletedtaskList = await response.json();
        console.log(deletedtaskList);

        const r = await fetch(url2 + 'ids');
        const data = await r.json();
        setOptions(data);
    };

    //********************map options********************
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(url2 + 'ids');
            const data = await response.json();
            setOptions(data);
        };
        fetchTasks();
    }, []);

    const [option, setOption] = useState("");

    return (
        <div className="todolist">
            <div className="buttons" >
                <button onClick={onClickSave}>Save as a new task list </button> <br></br>

                <select onChange={(e) => setOption(e.target.value)}>
                    <option>Choose your task list here</option>
                    {options.map(option => (
                        <option key={option}>{option}</option>
                    ))}
                </select>
                <button onClick={() => onClickLoad(option)}>Load</button>
                <button onClick={() => onClickUpdate(option)}>Update</button>
                <button onClick={() => onClickDelete(option)}>Delete</button>
            </div>
            <Header
                onInsertItem={onInsertItem}
            />
            <List
                items={items}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
            />
            <Footer
                items={items}
                onBatchChange={onBatchChange}
                onClearAllDone={onClearAllDone}
            />
        </div>
    );
}
