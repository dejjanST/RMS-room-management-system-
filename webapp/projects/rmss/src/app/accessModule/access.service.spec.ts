import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccessService } from './access.service';

describe('AccessService', () => {
  let service: AccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('testing findGroups()', () => {
    service.findGroups();

  });



  // it('testing handleItem()', fakeAsync(() => {
  //   let mergedData;
  //   service.globalMergedAccesList$.subscribe(res => {
  //     mergedData = res;
  //   });
  //   tick(500);
  //   expect(mergedData.buildings.length).toEqual(0);

  //   // after add one item in handleItem method, that item should be in globalMergedAccesList Subscription
  //   const item = new ACLTarget();
  //   item.id = 6;
  //   item.checked = true;
  //   service.handleItem(item, 'buildings');
  //   tick(500);
  //   expect(mergedData.buildings.length).toEqual(1);

  //   tick(500);
  //   const item1 = new ACLTarget();
  //   item1.id = 3;
  //   item1.checked = false;
  //   service.handleItem(item1, 'buildings');
  //   tick(500);
  //   expect(mergedData.buildings.length).toEqual(1);

  //   // clearACLList() should empty globalMergedAccesList
  //   service.clearACLList();

  //   tick(500);
  //   expect(mergedData.buildings.length).toEqual(0);

  // }));
});
