import {Injectable, OnInit} from '@angular/core';
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {TaskModel} from "@app/src/app/models/task.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaginatedTasks} from "@app/src/app/models/paginated-tasks.model";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";
import {environment} from "@app/src/environments/environment";

@Injectable()
export class TaskService implements OnInit {

  apiHost = environment.apiHost;

  constructor(private http: HttpClient) {
  }

  tasksChanged = new Subject<void>();

  ngOnInit() {
  }

  getTasks(status: string =  "NOT_STARTED", currentPage: number, pageSize: number): Observable<PaginatedTasks> {

    return this.http.get<PaginatedTasks>(this.apiHost + "/api/tasks/v1?status=" + status + "&pageNumber=" + currentPage + "&pageSize=" + pageSize);
  }

  updateTitle(id: number, title: string) {
    return this.http.patch(this.apiHost + "/api/tasks/v1/" + id, {
      title: title
    });
  }

  updateDescription(id: number, description: string) {
    return this.http.patch(this.apiHost + "/api/tasks/v1/" + id, {
      description: description
    });
  }

  updateStatus(id: number, status: string) {
    return this.http.patch(this.apiHost + "/api/tasks/v1/" + id, {
      status: status
    });
  }

  updatePriority(id: number, priority: string) {
    return this.http.patch(this.apiHost + "/api/tasks/v1/" + id, {
      priority: priority
    });
  }

  updatePosition(id: number, status: string, position: number) {
    return this.http.patch(this.apiHost + "/api/tasks/v1/" + id, {
      status: status,
      position: position
    }).subscribe();
  }

  onStatusChosen(task: TaskModel, newStatus: string) {
      this.tasksChanged.next();
  }

  addTaskToList(name: string, description: string, priority:string, status: string) {
    const newTask = new TaskModel(name, description, TaskPriorityEnum[priority as keyof typeof TaskPriorityEnum],
      TaskStatusEnum[status as keyof typeof TaskStatusEnum]);
    return this.http.post(this.apiHost + "/api/tasks/v1", newTask);
  }
}
