import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "@app/src/app/services/analytics.service";
import {BehaviorSubject, forkJoin} from "rxjs";
import {PercentageByStatus} from "@app/src/app/models/percentage-by-status.model";
import {ChartOptions} from "chart.js";
import {StatusByPriority} from "@app/src/app/models/status-by-priority.model";
import {StatusByPriorityItem} from "@app/src/app/models/status-by-priority-item.model";
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

    constructor(private analyticsService: AnalyticsService) {

        this.ngOnInit();
    }

    percentageByStatus: PercentageByStatus;
    pieChartOptions: ChartOptions<'doughnut'> = {
        responsive: false,
    };
    pieChartLabels: string[];
    pieChartDatasets: { data: number[]; }[] ;
    pieChartLegend = true;
    pieChartPlugins = [];

    statusByPriority: StatusByPriority;
    barChartLegend:boolean = true;
    barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    ngOnInit() {

        this.analyticsService.getPercentageByStatus().subscribe(res => {
            this.percentageByStatus = res;
            this.pieChartLabels = this.percentageByStatus.items.map(item => {
                return this.formatStatus(item.status);
            });
            this.pieChartDatasets = [ {
                data: this.percentageByStatus.items.map(item => item.percentage)
            } ]
        })

        this.analyticsService.getStatusByPriority().subscribe(res => {
            this.statusByPriority = res;
        })
    }

    getBarChartData(item: StatusByPriorityItem) {

        return item.statusItems.map(statusItem => {
            return {
                data: [statusItem.count],
                label: this.formatStatus(statusItem.status)
            }
        });
    }

    getBarChartLabels(item: StatusByPriorityItem) {

        return item.statusItems.map(statusItem => {
            return this.formatStatus(statusItem.status);
        });
    }

    public chartClicked(e:any):void {}

    public chartHovered(e:any):void {}

    public formatStatus(status: TaskStatusEnum): string {
        const statusStr = status.toString().toLowerCase().replace("_", " ");
        return statusStr.substring(0, 1).toUpperCase() + statusStr.substring(1);
    }

    public formatPriority(priority: number): string {
        const priorityStr = priority.toString().toLowerCase().replace("_", " ");
        return priorityStr.substring(0, 1).toUpperCase() + priorityStr.substring(1);
    }
}
