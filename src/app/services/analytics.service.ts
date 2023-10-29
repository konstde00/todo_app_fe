import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "@app/src/app/services/storage.service";
import {PercentageByStatus} from "@app/src/app/models/percentage-by-status.model";
import {Observable} from "rxjs";
import {StatusByPriority} from "@app/src/app/models/status-by-priority.model";
import {environment} from "@app/src/environments/environment";

@Injectable()
export class AnalyticsService {

    constructor(private http: HttpClient,
                private storageService: StorageService) {
    }

    getPercentageByStatus(): Observable<PercentageByStatus> {
        return this.http.get<PercentageByStatus>(`${environment.apiHost}/api/tasks/analytics/percentage-by-status`);
    }

    getStatusByPriority(): Observable<StatusByPriority> {
        return this.http.get<StatusByPriority>(`${environment.apiHost}/api/tasks/analytics/status-by-priority`);
    }
}
