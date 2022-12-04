import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { List } from "./List";
import SubmitForm from "./SubmitForm";

// import Tasks from "./Tasks";

//   handleDelete = (index) => {
//     const newArr = [...this.state.tasks];
//     newArr.splice(index, 1);
//     this.setState({ tasks: newArr });
//   };

//   handleSubmit = (task) => {
//     this.setState({ tasks: [...this.state.tasks, task] });
//   };

export default function App() {
  // const state = {
  //   tasks: ["task 1", "task 2", "task 3"],
  // };
  // console.log(state.tasks.length)


  const [tasks, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tasks`);
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  console.log(tasks.map((e => e.title)))

  return (
    <div className="wrapper">
      <div className="card frame">
        <Header numTodos={tasks.length} />
        <List tasks={tasks} />
        {/* <List tasks={state.tasks} onClick={(e) => handleDelete(e)} /> */}
        <SubmitForm />
        {/* <SubmitForm onFormSubmit={this.handleSubmit} /> */}
      </div>
    </div>
  );
}
