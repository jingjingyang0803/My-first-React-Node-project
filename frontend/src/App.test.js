import React from "react";
import { render, screen } from '@testing-library/react';
import TodoList from './components/TodoList';

test('TodoList renders without crashing', () => {
  render(<TodoList />);
});
