import { inject, Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { ListService } from '../../services/list.service';

import {
  addTodo,
  addTodoSuccess,
  loadTodos,
  loadTodosFailure,
  loadTodosSuccess,
  removeTodo, removeTodoFailure,
  removeTodoSuccess
} from './todo.actions';

@Injectable()
export class TodoEffects {

  private actions$ = inject(Actions);
  private listService = inject(ListService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() => {
        return this.listService.loadTodos().pipe(
          map(todos => {
            return loadTodosSuccess({ todos });
          }),
          catchError(error => {
            return of(loadTodosFailure({ error: error.message }));
          })
        );
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(action =>
        this.listService.addTodo(action.todo).pipe(
          map(todo => addTodoSuccess({ todo }))
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(action =>
        this.listService.removeTodo(action.id).pipe(
          map(() => {
            return removeTodoSuccess({ id: action.id });
          }),
          catchError(error => {
            return of(removeTodoFailure({ error }));
          })
        )
      )
    ),
    { dispatch: true }
  );
}
