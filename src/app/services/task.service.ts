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

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  tasksChanged = new Subject<void>();

  ngOnInit() {
  }

  getTasks(status: string =  "NOT_STARTED", currentPage: number, pageSize: number): Observable<PaginatedTasks> {

    return this.http.get<PaginatedTasks>(this.apiUrl + "/api/tasks?status=" + status + "&pageNumber=" + currentPage + "&pageSize=" + pageSize);
  }

  updateTitle(id: number, title: string) {
    return this.http.patch(this.apiUrl + "/api/tasks/" + id, {
      title: title
    });
  }

  updateDescription(id: number, description: string) {
    return this.http.patch(this.apiUrl + "/api/tasks/" + id, {
      description: description
    });
  }

  updateStatus(id: number, status: string) {
    return this.http.patch(this.apiUrl + "/api/tasks/" + id, {
      status: status
    });
  }

  updatePriority(id: number, priority: string) {
    return this.http.patch(this.apiUrl + "/api/tasks/" + id, {
      priority: priority
    });
  }

  updatePosition(id: number, status: string, position: number) {
    return this.http.patch(this.apiUrl + "/api/tasks/" + id, {
      status: status,
      position: position
    }).subscribe();
  }

  onStatusChosen(task: TaskModel, newStatus: string) {
      // const pos = this.getTasks().findIndex(t => t.title === task.title);
      // console.log("pos " + pos)
      // this.tasks[pos].status = TaskStatusEnum[newStatus as keyof typeof TaskStatusEnum];
      this.tasksChanged.next();
  }

  addTaskToList(name: string, description: string, priority:string, status: string) {
    const newTask = new TaskModel(name, description, TaskPriorityEnum[priority as keyof typeof TaskPriorityEnum],
      TaskStatusEnum[status as keyof typeof TaskStatusEnum]);
    return this.http.post(this.apiUrl + "/api/tasks", newTask);
  }
}
