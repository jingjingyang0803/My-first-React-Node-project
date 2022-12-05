import React, { useEffect, useState } from "react";
import Header from "./Header";
import List from "./List";
import Footer from "./Footer";
import "./TodoList.css";


export default function Todolist() {

    const [items, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:5000/api/v1/tasks`);
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);


    const onInsertItem = (item) => {
        setTasks([item, ...items]);
    };
    const onUpdateItem = (id, done) => {
        const new_items = items.map((item) => {
            if (item.id === id) return { ...item, done };
            else return item;
        });
        setTasks( new_items);
    };
    const onDeleteItem = (id) => {
        const new_items = items.filter((item) => {
            return item.id !== id;
        });
        setTasks(new_items);
    };
    const onBatchChange = (flag) => {
        const new_items = items.map((item) => {
            return { ...item, done: flag };
        });
        setTasks(new_items);
    };
    const onClearAllDone = () => {
        const new_items = items.filter((item) => {
            return item.done === false;
        });
        setTasks(new_items);
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
