import React, { useEffect, useState } from "react";
import Header from "./Header";
import List from "./List";
import Footer from "./Footer";
import "./TodoList.css";

const url = "http://localhost:5000/api/v1/tasks/";

export default function Todolist() {

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
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: Date.now(),
                name: name,
                done: false
            })
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

    return (
        <div className="todolist">
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
