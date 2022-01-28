import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACLList, ACLListItem } from '../access-list.model';
import { AccessListData } from './access.model';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  public tmpACLList: ACLList = new ACLList();
  private globalMergedACLList: BehaviorSubject<ACLList> = new BehaviorSubject(new ACLList());
  globalMergedACLList$: Observable<ACLList> = this.globalMergedACLList.asObservable();


  public tmpGroupList: Array<AccessListData> = [];
  private globalGroupList: BehaviorSubject<Array<AccessListData>> = new BehaviorSubject([]);
  public globalGroupList$ = this.globalGroupList.asObservable();


  findGroups() {
    this.tmpACLList.list.forEach(item => {
      if (!item.manual) {
        item.groups = [];

        this.tmpGroupList.forEach(group => {
          group.acl.forEach(groupAcl => {
            if (groupAcl.md5 === item.md5) {
              let g = JSON.parse(JSON.stringify(group));
              delete (g.acl);
              item.groups.push(g);
            }
          });
        });
      }
    });

  }

  pushGroup(group: AccessListData) {
    this.tmpGroupList.push(group);
    this.globalGroupList.next(this.tmpGroupList);
    group.acl.forEach(aclItem => {
      aclItem.manual = false;
      this.addItem(aclItem);
    });
  }

  removeGroup(group: AccessListData) {
    group.acl.forEach(item => {

      this.tmpACLList.list.forEach(globalItem => {

        if (!globalItem.manual) {
          globalItem.keep = false;

          this.tmpGroupList.forEach(innerGroup => {
            if (innerGroup.id !== group.id) {
              innerGroup.acl.forEach(groupAcl => {
                if (globalItem.md5 == groupAcl.md5) {
                  globalItem.keep = true;
                }

              });
            }
          });
        }
      });

      this.tmpACLList.list.forEach(item => {
        if (item.keep === false) {
          this.removeItem(item);
        }
      });
    });

    this.tmpGroupList = this.tmpGroupList.filter(item => {
      return item.id !== group.id;
    });

    this.globalGroupList.next(this.tmpGroupList);
    this.findGroups();

  }

  addItem(acl: ACLListItem) {
    if (!acl.md5) {
      const md5 = new Md5();
      acl.md5 = md5.appendStr(JSON.stringify(acl)).end();
    }

    // checking does this ACL already exist

    const index = this.tmpACLList.list.findIndex(item => item.md5 === acl.md5);

    // console.log(this.tmpACLList.list);

    this.findGroups();

    if (index === -1) {
      this.tmpACLList.list.push(acl);
      this.globalMergedACLList.next(this.tmpACLList);
    }


  }

  removeItem(acl: ACLListItem): void {
    delete (acl.keep);
    this.tmpACLList.list = this.tmpACLList.list.filter(item => item.md5 !== acl.md5);

    this.globalMergedACLList.next(this.tmpACLList);
  }

  // pushList(list: Array<ACLListItem>) {
  //   if (list !== null) {
  //     this.tmpACLList.list = list;
  //     this.globalMergedACLList.next(this.tmpACLList);
  //   }
  // }

  clearList(): void {
    this.globalMergedACLList.next(new ACLList());
    this.globalGroupList.next([]);
    this.tmpGroupList = [];
    this.tmpACLList.list = [];
  }

}
