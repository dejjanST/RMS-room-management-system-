import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GroupService } from '../group.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccessListData } from '../access.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, AfterViewInit {

  groups: AccessListData[] = [];
  groupName: string;
  @ViewChild('inputGroupName') inputGroupName: ElementRef;

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.groupService.getList().subscribe(res => {
      this.groups = res.data;
    });
  }

  ngAfterViewInit(): void {
    this.makeCall(fromEvent(this.inputGroupName.nativeElement, 'keyup'));
  }

  makeCall(e: any) {
    e.pipe(
      // Time in milliseconds between key events
      debounceTime(300)

      // If previous query is diffent from current
      , distinctUntilChanged()

      // subscription for response
    ).subscribe(() => {

      this.groupService.getList(this.groupName).subscribe(res => {
        this.groups = res.data;
      });
    });
  }

  openDialog(group: AccessListData): void {
    group.force = false;
    this.groupService.delete(group).subscribe(
      res => {
        this.groups = this.groups.filter(item => {
          return item.id !== group.id;
        });
      },
      err => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: '320px',
          height: '280px',
          data: group
        });
        dialogRef.afterClosed().subscribe((id: number) => {
          if (id) {
            group.force = true;
            this.groupService.delete(group).subscribe(res => {
              this.groups = this.groups.filter(item => {
                return item.id !== id;
              });
            });
          }
        });
      });
  }
}


