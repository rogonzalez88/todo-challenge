import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Todo } from '@models';

export interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },
    removeTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    updateTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    reorderTodo: (
      state: TodoState,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      state.list.splice(
        action.payload.to,
        0,
        state.list.splice(action.payload.from, 1)[0]
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo, reorderTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
