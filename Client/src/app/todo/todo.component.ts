import { Component } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {TodoService} from './todo.service';
import {Todo} from './todo';
import {AsyncPipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  public todos: Observable<Todo[]> | undefined;
  text:string = "";
  constructor(private todoService: TodoService) {}
  ngOnInit(){
    this.todos = this.todoService.getTodos();
  }
  onAdd():void{
    this.todoService.addTodo(this.text);
  }
  onDelete(id:number):void {
    this.todoService.removeTodo(id);
  }
}
