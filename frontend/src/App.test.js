// https://amourycodes.com/guides/a-simple-guide-to-getting-started-with-testing-your-react-components/71d7043798df4b9187730676ca6c4103
// https://codesandbox.io/s/2489y40n6n?file=/src/__tests__/TodoList.test.js
// https://selom.medium.com/todo-app-with-react-js-part-4-unit-testing-with-jest-4bae580d89a8

import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";// fireEvent is to simulate the user events
import TodoList from './components/TodoList';
import Header from './components/Header';
import Item from './components/Item';
import Footer from './components/Footer';


test('TodoList component renders without crashing', () => {
  render(<TodoList />);
});

// test("Todo adding should go through successfully", () => {
//   const onInsertItem = jest.fn()
//   render(<Header onInsertItem={onInsertItem} />)
//   const input = screen.getByPlaceholderText("Please input task name, confirm by Enter");

//   fireEvent.change(input, { target: { value: "Decorate" } });
//   fireEvent.submit(input);//NOT WORKING************** keyPress,keyup,KeyDown

//   expect(onInsertItem).toHaveBeenCalledTimes(1);// adding method called once
//   expect(onInsertItem).toHaveBeenCalledWith({
//     id: "1234",
//     name: "Decorate",
//     done: false,
//   })

//   expect(input).toHaveValue("");
// });

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

// test("Clear all completed todos should go through successfully", () => {
//   const mockedOnClearAllDone = jest.fn()
//   const mockedTodos = [
//     { id: 1, name: 'Shopping for presents', done: false },
//     { id: 2, name: 'Write Christmas cards', done: true },
//     { id: 3, name: 'Decorate', done: true },
//     { id: 4, name: 'Order food', done: false }];
//   render(<Footer todos={mockedTodos} onClearAllDone={mockedOnClearAllDone} 
//     />)// ************more prop needs here

//   fireEvent.click(screen.getByText(/Clear completed tasks/i));// <button>

//   expect(mockedOnClearAllDone).toHaveBeenCalledTimes(1);// adding method called once
// });