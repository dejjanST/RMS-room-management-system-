import { Component, OnInit } from '@angular/core';
import { UnitTypeService } from '../unit-type.service';
import { ResponseUnitType } from '../models/unit-type.Model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-unit-type-list',
  templateUrl: './unit-type-list.component.html',
  styleUrls: ['./unit-type-list.component.css']
})
export class UnitTypeListComponent implements OnInit {
  unitTypes: ResponseUnitType[] = [];

  constructor(
    private unitTypeService: UnitTypeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.unitTypeService.listUnitTypes().subscribe(res => {
      this.unitTypes = res.data;
    });
  }

  openDialog(unitType: ResponseUnitType): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: unitType
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.unitTypeService.deleteUnitType(id).subscribe(res => {
          this.unitTypes = this.unitTypes.filter(item => {
            return item.id !== unitType.id;
          });
        });
      }
    });
  }
}

