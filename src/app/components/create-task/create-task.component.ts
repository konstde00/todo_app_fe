import {Component, OnInit} from '@angular/core';
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {TaskService} from "@app/src/app/services/task.service";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";
import {catchError, map} from "rxjs";
import {AppToastService} from "@app/src/app/services/toast.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskService: TaskService;

  priority: TaskPriorityEnum = TaskPriorityEnum.LOW;
  status: TaskStatusEnum = TaskStatusEnum.NOT_STARTED;

  constructor(taskService: TaskService,
              private toastr: AppToastService) {
    this.taskService = taskService;
  }

  ngOnInit() {
  }

  onSubmit(submittedForm: { invalid: any; value: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const task = submittedForm.value;

    this.taskService.addTaskToList(task.name, task.description, task.priority, task.status)
        .pipe(
           map(() => {
               this.toastr.showSuccess('Success', 'Task has been successfully created');
           }),
            // @ts-ignore
            catchError((error) => {
            this.toastr.showError('Error', error.error.message);
        }))
        .subscribe();

  }

  protected readonly TaskStatusEnum = TaskStatusEnum;
  protected readonly TaskPriorityEnum = TaskPriorityEnum;
}
