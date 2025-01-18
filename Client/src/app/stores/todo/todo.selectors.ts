import { createSelector, createFeatureSelector } from '@ngrx/store';

import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todos');
export const selectTodos = createSelector(selectTodoState, (state: TodoState) => state.todos);
export const selectTodoStatus = createSelector(selectTodoState, (state: TodoState) => state.status);
