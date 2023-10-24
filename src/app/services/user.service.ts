import {Injectable, OnInit} from '@angular/core';
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {TaskModel} from "@app/src/app/models/task.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaginatedTasks} from "@app/src/app/models/paginated-tasks.model";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";
import {PaginatedUsers} from "@app/src/app/models/paginated-users.model";
import {environment} from "@app/src/environments/environment";

@Injectable()
export class UserService implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  syncWithIdp(token: string) {
    return this.http.patch(environment.apiUrl + "/api/users/sync-with-idp?token=" + token, {});
  }

  getUsers(search: string =  "", currentPage: number = 0, pageSize: number = 10): Observable<PaginatedUsers> {

    return this.http.get<PaginatedUsers>("http://localhost:8080/api/admin/users?search=" + search
        + "&pageNumber=" + currentPage + "&pageSize=" + pageSize);
  }

  updateAvailableFeatures(userId: string, featureFlagId: string, isSelected: boolean) {
    return this.http.patch(environment.apiUrl + "/api/admin/v1/feature-flag?userId=" + userId
      + "&featureFlagId=" + featureFlagId + "&isSelected=" + isSelected, {});
  }

  register(login: string, password: string) {
    return this.http.post(environment.apiUrl + "/api/admin/users", {
      login: login,
      password: password
    });
  }

  initPasswordReset(email: string) {
    return this.http.post(environment.apiUrl + "/api/account/reset-password/init?mail=" + email, {});
  }

  finishPasswordReset(newPassword: string, verificationCode: string) {
    return this.http.post(environment.apiUrl + "/api/account/reset-password/finish", {
      key: verificationCode,
      newPassword: newPassword,
    });
  }
}
