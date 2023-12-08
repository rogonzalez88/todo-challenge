import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  RootState,
  addTodo,
  removeTodo,
  updateTodo,
  reorderTodo,
} from '@store';
import { Todo } from '@models';

const useTodo = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.todo);

  const addTodoItem = (title: string) =>
    dispatch(addTodo({ id: uuidv4(), title, done: false }));

  const removeTodoItem = (todoDeleted: Todo) =>
    dispatch(removeTodo(todoDeleted));

  const updateTodoItem = (todoUpdated: Todo) =>
    dispatch(updateTodo(todoUpdated));

  const reorderItems = (from: number, to: number) =>
    dispatch(reorderTodo({ from, to }));

  return {
    list,
    addTodoItem,
    removeTodoItem,
    updateTodoItem,
    reorderItems,
  };
};

export default useTodo;
