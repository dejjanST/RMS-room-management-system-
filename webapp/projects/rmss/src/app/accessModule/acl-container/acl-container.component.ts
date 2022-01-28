import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestKeyAccess } from '../access-key/key';
import { AccessService } from '../access.service';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-acl-container',
  templateUrl: './acl-container.component.html',
  styleUrls: ['./acl-container.component.css']
})
export class AclContainerComponent implements OnInit {

  keyId: number;

  constructor(
    private keyService: KeyService,
    private activatedRoute: ActivatedRoute,
    private accessService: AccessService,
  ) { }

  ngOnInit(): void {
    this.keyId = +this.activatedRoute.snapshot.paramMap.get('keyId');
  }

  assignPermissions() {
    const key = new RequestKeyAccess();
    key.key_id = this.keyId;
    key.acl = this.accessService.tmpACLList.list;
    key.groups = this.accessService.tmpGroupList;

    this.keyService.assignAccess(key).subscribe();
  }

}
