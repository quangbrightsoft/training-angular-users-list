import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '../messages.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columnsToDisplay: string[] = ['email', 'fullName', 'roles', 'actions'];

  roleOptions = [
    { name: 'Admin', value: 'Admin' },
    { name: 'Power user', value: 'PowerUser' },
    { name: 'Patient', value: 'Patient' },
    { name: 'Doctor', value: 'Doctor' },
    { name: 'BMA', value: 'BmaSkill' },
  ];

  rolesControl = new FormControl();

  selectedRoleFilter;
  
  pagingOptions = {
    currentPage: 0,
    pageSize: 10,
    totalCount: 0
  }
  sortingOptions = {
    sortBy: 'email',
    desc: false
  }
  searchQuery: string;
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, private router: Router, private messages: MessageService, private service: UserService) { }

  goToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
  getUsers(): void {
    let params = {
      page: (this.pagingOptions.currentPage + 1).toString(),
      pageSize: this.pagingOptions.pageSize.toString(),
    }
    if (this.searchQuery) {
      Object.assign
        (params, { search: this.searchQuery })
    }
    if (this.sortingOptions.sortBy) {
      Object.assign
        (params, { descending: this.sortingOptions.desc, sortBy: this.sortingOptions.sortBy })
    }
    if (this.selectedRoleFilter) {
      Object.assign
        (params, { roles: this.selectedRoleFilter })
    }
    this.service.getUsers(params).subscribe(r => {
      this.dataSource.data = r.items;
      this.pagingOptions.currentPage = r.page - 1;
      this.pagingOptions.pageSize = r.pageSize;
      this.pagingOptions.totalCount = r.totalCount;
    }
    );
  }
  ngOnInit(): void {
    this.getUsers();
  }
  changePage($event) {
    this.pagingOptions.currentPage = $event.pageIndex;
    this.pagingOptions.pageSize = $event.pageSize;
    this.pagingOptions.totalCount = $event.length;
    this.getUsers();
  }
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.sortingOptions.desc = sort.direction == 'desc';
      this.sortingOptions.sortBy = undefined;

      return;
    }
    if (sort.direction) {
      this.sortingOptions.desc = sort.direction == 'desc';
      this.sortingOptions.sortBy = sort.active;
    }

    this.getUsers();
  }
  openDeleteDialog(row) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {
        title: 'Delete ' + row.email + '?',
        text: 'Are you sure you want to delete this user?',
        actions: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result === true && this.service.delete(row.id).subscribe(r => {
        this.messages.add('Delete successful')
        this.getUsers();
      }
      );
    });
  }
}