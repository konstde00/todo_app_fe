import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [new Task(1, 'Task 1', 'Task 1 description')]

  getTasks(page: number, pageSize: number): Task[] {
    // Implement pagination logic here
    return this.tasks;
  }
}
