import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Pagination} from "@app/src/app/models/pagination";
import {TaskModel} from "@app/src/app/models/task.model";
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";

@Component({
  selector: 'app-task-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasks: TaskModel[] = [];
  currentPage = 1;
  pageSize = 10;

  @Input() pagination: Pagination;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    // this.tasks = this.taskService.getTasks("NOT_STARTED", this.currentPage, this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTasks();
  }

  ngOnDestroy(): void {
  }
}
