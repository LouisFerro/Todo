import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Todo} from './todo';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos :BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  url = "http://localhost:3000/todo/";
  constructor(private http:HttpClient) { }
  public getTodos(): Observable<Todo[]>{
    this.http.get<Todo[]>(this.url).subscribe(x => this.todos.next(x));
    return this.todos.asObservable();
  }
  public addTodo(text:string):void{
    let t: Todo = new Todo(-1, text);
    this.http.post<Todo>(this.url, {text:text}).subscribe(x => {
      this.todos.next([...this.todos.value, x]);
    });

  }
  public removeTodo(id:number):void{
    this.http.delete<string>(this.url+id).subscribe(x =>
      {this.todos.next(this.todos.value.filter(todo => todo.id !== id));
      });
  }
}
