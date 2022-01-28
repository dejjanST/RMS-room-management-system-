import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Building } from '../buildings';
import { BuildingService } from '../building.service';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { Site } from '../../site/site';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../../globalService/global.service';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  building: Building = new Building();
  form: FormGroup;
  siteId: number;
  clientId: number;
  buildingId: number;
  site: Site = new Site();
  floorImgUrl$: Observable<string> = of(this.imgUrl());

  constructor(
      private fb: FormBuilder
    , private route: ActivatedRoute
    , public globalService: GlobalService
    , private buildingService: BuildingService
    , private router: Router
    , private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.siteId = +this.route.snapshot.paramMap.get('siteId');
    this.globalService.site.set(this.siteId);
    this.globalService.site.data$.subscribe(
      res => {
        this.clientId = res.client_id;
        this.site.data = res;
      }
    );

    this.buildingId = +this.route.snapshot.paramMap.get('buildingId');

    if (this.buildingId > 0) {
      this.buildingService.get(this.buildingId).subscribe(
        (res: Building) => {
          if (res.data.file_id) {
            this.floorImgUrl$ = of(this.imgUrl(res.data.file_id.toString()));
            this.building.data.file_id = res.data.file_id;
          }
          this.form.get('name').setValue(res.data.name);
          this.form.get('desc').setValue(res.data.desc);
        }
      );
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, VedValidators.minLength(2)]],
      desc: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  imgUrl(id: string = ''): string {
    return '/files/' + id;
  }

  fileBrowseHandler(event: any) {
    this.fileUploadService.upload(event.target.files[0], 'building', this.buildingId).subscribe(
      res => {
        if (res.body.data.id) {
          this.floorImgUrl$ = of(this.imgUrl(res.body.data.id));
          this.building.data.file_id = res.body.data.id;
        }
      });
  }

  save() {
    this.building.data.name = this.form.get('name').value;
    this.building.data.desc = this.form.get('desc').value;

    if (this.buildingId > 0) {
      this.building.data.id = this.buildingId;
      this.buildingService.update(this.building).subscribe(
        res => {
          this.router.navigate(['sites', this.siteId, 'buildings']);
        }
      );
    }
    else {
      this.building.data.client_id = this.clientId;
      this.building.data.site_id = this.siteId;

      this.buildingService.create(this.building).subscribe(
        res => {
          this.router.navigate(['sites', this.siteId, 'buildings']);
        }
      );
    }
  }
}
