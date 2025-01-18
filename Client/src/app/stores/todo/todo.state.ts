import { TodoModel } from '../../models/todo.model';

export interface TodoState {
  todos: TodoModel[];
  error: any;
  status: ListStatus;
}

export enum ListStatus {
  'Pending',
  'Loading',
  'Error',
  'Success'
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: ListStatus.Pending
};
