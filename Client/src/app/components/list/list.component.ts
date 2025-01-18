import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppState } from '../../app.state';
import { TodoModel } from '../../models/todo.model';
import { ListStatus } from '../../stores/todo/todo.state';
import { addTodo, loadTodos, removeTodo } from '../../stores/todo/todo.actions';
import { selectTodos, selectTodoStatus } from '../../stores/todo/todo.selectors';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public todos$: Observable<TodoModel[]> | undefined;
  public status$: Observable<ListStatus> | undefined;
  public text: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());

    this.todos$ = this.store.select(selectTodos);
    this.status$ = this.store.select(selectTodoStatus);
  }

  onAdd(): void {
    if (this.text.trim()) {
      const todo: TodoModel = new TodoModel(Date.now(), this.text);

      this.store.dispatch(addTodo({ todo: todo }));
      this.text = '';
    }
  }

  onDelete(id: number): void {
    this.store.dispatch(removeTodo({ id }));
  }
}
