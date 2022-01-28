import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ACLItem, ACLListItem } from '../../access-list.model';
import { BuildingService } from '../../building/building.service';
import { FloorService } from '../../floor/floor.service';
import { UnitService } from '../../unit/unit.service';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-acl-manager',
  templateUrl: './acl-manager.component.html',
  styleUrls: ['./acl-manager.component.css']
})
export class AclManagerComponent implements OnInit, OnDestroy {
  @ViewChild('aclTable', { static: true }) aclTable: MatTable<any>;
  selected: ACLListItem = new ACLListItem();
  aclList: Array<ACLListItem> = [];
  buildings: Array<ACLItem> = [];
  floors: Array<ACLItem> = [];
  units: Array<ACLItem> = [];
  displayedColumns: Array<string> = ['building', 'floor', 'unit', 'groups', 'actions'];
  aclSubscription: Subscription;
  selectAllBuidlings = true;

  constructor(
    public accessService: AccessService,
    public buildingService: BuildingService,
    public floorService: FloorService,
    public unitService: UnitService,
  ) { }


  ngOnInit(): void {
    // clearing previous access list in global access service
    this.accessService.clearList();

    // adding "All" option in building drop-down menu
    const building = new ACLItem();
    building.id = null;
    building.name = 'All';
    this.buildings.push(building);
    this.selected.building = building;

    // clear previous selected floor and unit on building change
    this.clearFloors();
    this.clearUnits();


    this.aclSubscription = this.accessService.globalMergedACLList$.subscribe(res => {
      this.aclList = res.list;
      if (this.aclTable.dataSource) {
        // adding new rows after adding new rules in global access list
        this.aclTable.renderRows();
      }

      // checking in which group belongs each access rule
      this.accessService.findGroups();
    });

    // filling building drop-down menu
    this.buildingService.getList({}).subscribe(res => {
      res.data.forEach(resBuilding => {
        const item = new ACLItem();
        item.id = resBuilding.id;
        item.name = resBuilding.name;
        this.buildings.push(item);
      });
    });


  }

  ngOnDestroy(): void {
    this.aclSubscription.unsubscribe();
  }


  clearFloors() {
    const floor = new ACLItem();
    floor.id = null;
    floor.name = 'All';
    this.floors = [];
    this.floors.push(floor);
    this.selected.floor = floor;
  }

  clearUnits() {
    const unit = new ACLItem();
    unit.id = null;
    unit.name = 'All';
    this.units = [];
    this.units.push(unit);
    this.selected.unit = unit;
  }

  onSelect(event: any, itemType: string) {
    // this code is for selected building, floor or unit different then "All" option
    if (event.value !== '*') {
      if (itemType === 'building') {
        this.clearFloors();
        this.clearUnits();
        // when ALL is selected, include and exclude will be disabled
        this.selectAllBuidlings = this.selected.building.name === 'All' ? true : false;

        this.selected[itemType] = event.value;
        // getting floor list
        this.floorService.getList({ building_id: this.selected.building.id }).subscribe(res => {
          res.data.forEach(floor => {
            // adding options in floor drop-down menu
            const item = new ACLItem();
            item.id = floor.id;
            item.name = floor.name;
            this.floors.push(item);
          });
        });
      }
      else if (itemType === 'floor') {
        this.clearUnits();
        this.selected[itemType] = event.value;
        // getting unit list
        this.unitService.getList({ floor_id: this.selected.floor.id }).subscribe(res => {
          res.data.forEach(unit => {
            const item = new ACLItem();
            item.id = unit.id;
            item.name = unit.name;
            this.units.push(item);
          });
        });
      }
    }
    else if (event.value === '*') {
      if (itemType === 'building') {
        this.selected.building = undefined;
        this.selected.floor = undefined;
      }
      else if (itemType === 'floor') {
        this.selected.floor = undefined;
      }
    }
  }

  include() {
    this.selected.exclude = false;
    this.selected.manual = true;
    this.accessService.addItem(Object.assign({}, this.selected));
  }

  exclude() {
    this.selected.exclude = true;
    this.selected.manual = true;
    this.accessService.addItem(Object.assign({}, this.selected));
  }

  removeItem(item: ACLListItem) {
    this.accessService.removeItem(item);
  }

}
