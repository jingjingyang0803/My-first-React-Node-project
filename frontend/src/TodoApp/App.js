import React from 'react';
// import { useEffect, useState } from "react";
import './App.css';
import Header from './Header';
import {List} from './List';
import SubmitForm from './SubmitForm';

class App extends React.Component {
  state = {
    tasks: ['task 1', 'task 2', 'task 3']
    // add my own
  };

  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({tasks: newArr});
  }

  handleSubmit = task => {
    this.setState({tasks: [...this.state.tasks, task]});
  }

  render() {
    return(
      <div className='wrapper'>
        <div className='card frame'>
          <Header numTodos={this.state.tasks.length} />
          <List tasks={this.state.tasks} onDelete={this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  } 
}

export default App;