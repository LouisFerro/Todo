import { createReducer, on } from '@ngrx/store';

import { initialState, ListStatus } from './todo.state';
import * as ListActions from './todo.actions';

export const todoReducer = createReducer(
  initialState,
  on(ListActions.addTodo, (state, { todo }) => ({
    ...state,
    todo: [...state.todos, todo],
  })),
  on(ListActions.removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
  on(ListActions.loadTodos, (state) => ({
    ...state,
    status: ListStatus.Loading,
  })),
  on(ListActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    error: null,
    status: ListStatus.Success,
  })),
  on(ListActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    status: ListStatus.Error,
  }))
);
