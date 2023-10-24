import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "@app/src/app/services/user.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {TaskModel} from "@app/src/app/models/task.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {UserModel} from "@app/src/app/models/user.model";
import {DropdownItem} from "@app/src/app/models/dropdown-item.model";
import {MatSelect} from "@angular/material/select";
import {MatOptionSelectionChange} from "@angular/material/core";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  totalElements: number = 0;

  displayedColumns: string[] = ['login', 'first_name', 'last_name', 'feature_flags'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  @ViewChild('table') table: MatTable<TaskModel>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSelect) matSelect: MatSelect;

  featureFlags: DropdownItem[] = [
      {value: "0", viewValue: 'Analytics'},
  ];

  usersChanged = new Subject<void>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

      this.loadUsers();
  }

  loadUsers(search: string = "") {

      console.log("paginator: " + this.paginator);

    const pageSize = (this.paginator == undefined) ? 10 : this.paginator.pageSize;
    const pageIndex =  (this.paginator == undefined) ? 0 : this.paginator.pageIndex;

    this.userService.getUsers(search, pageIndex, pageSize)
        .subscribe(res => {
          this.dataSource.data = res.items;
          this.totalElements = res.metadata.pagination.totalCount;
        });
  }

  applyFilter(search: string) {
      this.loadUsers(search);
  }

  onPageChange(event: PageEvent) {
    this.userService.getUsers("", event.pageIndex, event.pageSize)
        .subscribe(res => {
          this.dataSource.data = res.items;
          this.totalElements = res.metadata.pagination.totalCount;
        });
  }

  updateAvailableFeatures(event: MatOptionSelectionChange, element: UserModel) {

      const featureFlag = event.source.value;
      const selected = event.source.selected;

      this.userService.updateAvailableFeatures(element.id, featureFlag, selected)
          .subscribe(() => {
              console.log("updated feature flag")
          });
  }
}
