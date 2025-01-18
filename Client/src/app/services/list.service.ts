import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  url = "http://localhost:3000/todo/";

  constructor(private http: HttpClient) { }

  loadTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.url);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.url, { todo });
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }
}
