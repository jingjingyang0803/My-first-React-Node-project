import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";// fireEvent is to simulate the user events
import TodoList from './components/TodoList';
import Header from './components/Header';
import Item from './components/Item';
import Footer from './components/Footer';


test('TodoList component renders without crashing', () => {
  render(<TodoList />);
});

test("Todo is marked completed on checkbox click", () => {
  const mockedOnUpdateItem = jest.fn();
  const mockedTodo = {
    id: 1,
    name: 'Shopping for presents',
    done: false
  };
  render(<Item todo={mockedTodo} onUpdateItem={mockedOnUpdateItem} />);

  const checkbox = screen.getByTestId('checkbox');
  fireEvent.click(checkbox);// <input>

  expect(mockedOnUpdateItem).toHaveBeenCalledTimes(1);// marking method called once
  expect(checkbox).toBeChecked();// the todo is marked opposite,in this case it is marked from undone to done
});


test("Todo item to be deleted on click of Remove button", () => {
  const mockedOnDeleteItem = jest.fn();
  const mockedTodo = {
    id: 3,
    name: 'Decorate',
    done: false
  };
  render(<Item todo={mockedTodo} onDeleteItem={mockedOnDeleteItem} />);

  fireEvent.click(screen.getByText(/Remove/i));// <button>

  expect(mockedOnDeleteItem).toHaveBeenCalledTimes(1);// delete method called once

  const deletedTodo = screen.queryByTestId('item');// <li>
  expect(deletedTodo).not.toBeInTheDocument();// the todo is removed
});