import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FloorService } from '../floor.service';
import { FloorSearch, ResponseFloorList } from '../floor';
import { GlobalService } from '../../globalService/global.service';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  floorId: number;
  floorSearch: FloorSearch = new FloorSearch();
  floors: ResponseFloorList = new ResponseFloorList();
  buildingId: number;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private floorService: FloorService,
    public globalService: GlobalService,
  ) { }


  ngOnInit(): void {
    this.buildingId = +this.route.snapshot.paramMap.get('buildingId');

    this.globalService.building.set(this.buildingId);

    this.floorSearch.building_id = this.buildingId;

    this.floorService.getList(this.floorSearch).subscribe(
      (floors: ResponseFloorList) => {
        this.floors = floors;
        this.floors.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
      }
    );
  }


  openDialog(floor: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: floor
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.floorService.delete(id).subscribe(res => {
          this.floorService.getList(this.floorSearch).subscribe(floors => {
            this.floors = floors;
            });
        });
      }
    });
  }
}
