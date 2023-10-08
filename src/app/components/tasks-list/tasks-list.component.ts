import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import {IRulePaginationV3} from "@app/src/app/models/pagination";

@Component({
  selector: 'app-task-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [new Task(1, 'Task 1', 'Desc')];
  currentPage = 1;
  pageSize = 10;

  @Input() pagination: IRulePaginationV3;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(this.currentPage, this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTasks();
  }

  ngOnDestroy(): void {
  }
}
