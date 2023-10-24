import {Component, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {TaskModel} from "@app/src/app/models/task.model";
import {TaskService} from "@app/src/app/services/task.service";
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  status = TaskStatusEnum.COMPLETED;

  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  ngOnInit() {
  }
}
