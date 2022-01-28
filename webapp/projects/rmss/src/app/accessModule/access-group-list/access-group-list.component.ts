import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { AccessListData } from '../access.model';
import { AccessService } from '../access.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-access-group-list',
  templateUrl: './access-group-list.component.html',
  styleUrls: ['./access-group-list.component.css']
})
export class AccessGroupListComponent implements OnInit {
  @ViewChild('groupList') groupList: any;
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  cachedGroups = {};
  mergedAccessList: AccessListData = new AccessListData();
  originalGroups: Array<AccessListData> = [];
  filteredGroups: Observable<Array<AccessListData>>;
  filterGroupsFormControl = new FormControl();
  mainSubscription: Subscription;

  groupFilter = new FormControl();
  selectedGroups: Array<AccessListData> = [];

  constructor(
    private groupService: GroupService,
    private accessService: AccessService
  ) { }

  ngOnInit(): void {

    this.accessService.globalGroupList$.subscribe(groups => {
      this.selectedGroups = groups;
    });

    this.mainSubscription = this.groupService.getList()
      .subscribe(res => {
        this.originalGroups = res.data;
      });
  }

  remove(group: AccessListData): void {
    this.accessService.removeGroup(group);
  }

  // when select from Group drop-down list
  selected(event: MatAutocompleteSelectedEvent): void {
    this.setGroup(event.option.value);
    this.groupFilter.setValue('');
  }

  setGroup(group: AccessListData) {
    this.groupService.getAccess(group.id).subscribe(res => {
      // after get ACL for selected group, group with ACL will be pushed in global ACL service
      this.accessService.pushGroup(res.data);
    });
  }

}
