import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';
import { ACLList } from '../../access-list.model';
import { RequestAccessGroup } from '../access.model';
import { AccessService } from '../access.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.css']
})
export class AccessGroupComponent implements OnInit {
  groupName: FormControl = new FormControl('', [VedValidators.minLength(3)]);
  groupColor: FormControl = new FormControl('', [VedValidators.required, VedValidators.pattern('^#[0-9a-fA-F]{6}$')]);
  groupId: number;
  accesList: ACLList;
  groupDetails: any;
  color: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accessService: AccessService,
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accessService.clearList();
    this.accessService.globalMergedACLList$.subscribe(res => {
      this.accesList = res;
    });
    this.groupId = +this.activatedRoute.snapshot.paramMap.get('groupId');
    if (this.groupId) {
      this.groupService.getAccess(this.groupId).subscribe(res => {
        this.groupDetails = res.data;
        this.groupName.setValue(res.data.name);
        this.groupColor.setValue(res.data.color);

        // this.accessService.pushList(res.data.acl);
        res.data.acl.forEach(item => {
          item.manual = true;
          this.accessService.addItem(item);
        });
      });
    }
    else {
      // generating random color on create Group
      this.groupColor.setValue(this.getRandomColor());
    }
  }

  colorChanged(event: any) {
    this.groupColor.patchValue(event);
  }

  getRandomColor(): string {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  submit() {
    const reqACLGroup = new RequestAccessGroup();
    reqACLGroup.name = this.groupName.value;
    // TODO: hardcoded
    reqACLGroup.type = 1;
    reqACLGroup.color = this.groupColor.value;
    reqACLGroup.acl = this.accesList.list.map(item => { item.manual = false; return item; });

    if (this.groupId) {
      this.groupService.update(this.groupId, reqACLGroup).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    }
    else {
      this.groupService.create(reqACLGroup).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    }
  }


}
