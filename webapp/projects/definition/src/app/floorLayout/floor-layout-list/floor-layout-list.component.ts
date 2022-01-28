import { Component, OnInit } from '@angular/core';
import { FloorLayoutService } from '../floor-layout.service';
import { FloorLayout } from '../floor-layout.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../../globalService/global.service';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-floor-layout-list',
  templateUrl: './floor-layout-list.component.html',
  styleUrls: ['./floor-layout-list.component.css']
})
export class FloorLayoutListComponent implements OnInit {
  floorLayouts: FloorLayout[] = [];
  siteId: number;

  constructor(
    private floorLayoutService: FloorLayoutService,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.siteId = +this.route.snapshot.paramMap.get('siteId');
    this.globalService.site.set(this.siteId);

    this.floorLayoutService.getFloorLayoutsBySiteList(this.siteId).subscribe(res => {
      this.floorLayouts = res.data;
    });

  }

  openDialog(floorLayout: FloorLayout): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: floorLayout
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.floorLayoutService.deleteFloorLayout(id).subscribe(res => {
          this.floorLayouts = this.floorLayouts.filter(item => {
            return item.id !== floorLayout.id;
          });
        });
      }
    });
  }

}



