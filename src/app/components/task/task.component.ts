import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "@app/src/app/models/task.model";
import {StorageService} from "@app/src/app/services/storage.service";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: TaskModel;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {

    this.task = this.storageService.getTask();
    console.log('task: '+JSON.stringify(this.task))
  }
}
