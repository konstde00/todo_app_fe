import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "@app/src/app/services/task.service";
import {TaskModel} from "@app/src/app/models/task.model";
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  mouseOn = false;

  @Input() task: TaskModel;

  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  ngOnInit() {
  }

  onMouseEnter() {
    this.mouseOn = true;
  }

  onMouseLeave() {
    this.mouseOn = false;
  }

  onAssign(status: string) {
    this.taskService.onStatusChosen(this.task, status);
  }

  protected readonly Status = TaskStatusEnum;
}
