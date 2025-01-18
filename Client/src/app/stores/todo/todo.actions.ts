import { createAction, props } from '@ngrx/store';

import { TodoModel } from '../../models/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: TodoModel[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: TodoModel }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: TodoModel }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: any }>()
);

export const removeTodo = createAction(
  '[Todo] remove Todo',
  props<{ id: number }>()
);
export const removeTodoSuccess = createAction(
  '[Todo] remove Todo Success',
  props<{ id: number }>()
);
export const removeTodoFailure = createAction(
  '[Todo] remove Todo Failure',
  props<{ error: any }>()
);
