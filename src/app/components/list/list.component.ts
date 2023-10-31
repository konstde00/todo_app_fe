import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TaskModel} from "@app/src/app/models/task.model";
import {TaskService} from "@app/src/app/services/task.service";
import {Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TaskPriorityEnum} from "@app/src/app/models/task-priority-enum.model";
import {TaskStatusEnum} from "@app/src/app/models/task-status-enum.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DropdownItem} from "@app/src/app/models/dropdown-item.model";
import {StorageService} from "@app/src/app/services/storage.service";

const ELEMENT_DATA: TaskModel[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, OnDestroy {

  totalElements: number = 0;

  displayedColumns: string[] = ['title', 'description', 'priority', 'status'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  @ViewChild('table') table: MatTable<TaskModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statuses: DropdownItem[] = [
    {value: 'NOT_STARTED', viewValue: 'Not started'},
    {value: 'IN_PROGRESS', viewValue: 'In progress'},
    {value: 'COMPLETED', viewValue: 'Completed'},
    {value: 'CANCELLED', viewValue: 'Cancelled'},
  ];

  priorities: DropdownItem[] = [
    {value: 'LOW', viewValue: 'Low'},
    {value: 'MEDIUM', viewValue: 'Medium'},
    {value: 'HIGH', viewValue: 'High'},
  ];

  tasksChanged = new Subject<void>();

  updateStatus(event: any, element: TaskModel) {

      if (event.source.value !== element.status) {
          this.taskService.updateStatus(element.id, event.source.value)
              .subscribe(() => {
                  this.tasksChanged.next();
              });
      }
  }

  updatePriority(event: any, element: TaskModel) {

      if (event.source.value !== element.priority) {
          this.taskService.updatePriority(element.id, event.source.value)
              .subscribe(
                  () => {
                      this.tasksChanged.next();
                  }
              );
      }
  }

  onPositionUpdate(event: CdkDragDrop<MatTableDataSource<TaskModel>, any>) {
      moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
      this.table.renderRows();
      this.taskService.updatePosition(event.item.data.id, event.item.data.status, event.currentIndex);
  }

  onPageChange(event: PageEvent) {
    this.activatedRoute.params.subscribe(
        (params) => {
          this.taskService.getTasks(params['status'].toUpperCase(), event.pageIndex, event.pageSize)
              .subscribe(res => {
                this.dataSource.data = res.items;
                this.totalElements = res.metadata.pagination.totalCount;
              });
          this.loadedStatus = params['status'];
        }
    );
  }

  tasks: TaskModel[];
  activatedRoute: ActivatedRoute;
  taskService: TaskService;
  loadedStatus = 'NOT_STARTED';
  isLoading = false;
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute,
              private router: Router,
              private storageService: StorageService,
              taskService: TaskService) {
    this.activatedRoute = activatedRoute;
    this.taskService = taskService;
  }

  ngOnInit() {
    this.loadTasks();
    this.subscription = this.tasksChanged.subscribe(
        () => {
            this.loadTasks();
        }
    );
  }

  onTasksChanged() {

    this.loadTasks();
  }

  loadTasks() {

    this.activatedRoute.params.subscribe(
        (params) => {
          const pageSize = (this.dataSource.paginator == undefined) ? 10 : this.dataSource.paginator.pageSize;
          const pageIndex =  (this.dataSource.paginator == undefined) ? 0 : this.dataSource.paginator.pageIndex;

          this.taskService.getTasks(params['status'].toUpperCase(), pageIndex, pageSize)
              .subscribe(res => {
                this.dataSource.data = res.items;
                this.totalElements = res.metadata.pagination.totalCount;
              });
          this.loadedStatus = params['status'];
        }
    );
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  onClick(task: TaskModel) {

    this.storageService.saveTask(task);
    this.router.navigate(['/tasks-landing/' + task.id]);
  }
}
