import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BuildingService } from '../building.service';
import { Client } from '../../client/client.model';
import { Site, SiteSearch } from '../../site/site';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ResponseBuildingList, BuildingSearch } from '../buildings';
import { GlobalService } from '../../globalService/global.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})

export class BuildingListComponent implements OnInit {

  form = new FormGroup({});

  filteredClients: Observable<Client[]>;
  selectedClient: string;
  sites: Observable<Site[]>;
  siteSearch: SiteSearch = new SiteSearch();
  buildings: ResponseBuildingList = new ResponseBuildingList();
  siteId: number;
  clientId: number;
  buildingSearch: BuildingSearch = new BuildingSearch();

  constructor(
    private buildingService: BuildingService,
    public globalService: GlobalService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.siteId = +this.route.snapshot.paramMap.get('siteId');
    this.globalService.site.set(this.siteId);
    this.buildingSearch.site = this.siteId;
    this.buildingService.getList(this.buildingSearch).subscribe(
      (buildings: ResponseBuildingList) => {
        this.buildings = buildings;
        this.buildings.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
      }
    );

  }

  // openDialog(building: any): void {
  //   const dialogRef = this.dialog.open(DialogBuildingComponent, {
  //     width: '300px',
  //     height: '',
  //     data: { building }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       this.buildingService.delete(result).subscribe(
  //         (res: HttpResponse<any>) => {
  //           this.buildingService.getList(this.buildingSearch).subscribe(builgings => {
  //             this.buildings = builgings;
  //           });
  //         },
  //         (err: HttpErrorResponse) => {
  //           throw err;
  //         });
  //     }
  //   });
  // }
}



