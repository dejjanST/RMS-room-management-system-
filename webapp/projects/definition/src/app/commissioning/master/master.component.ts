import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestController, ResponseControllers, Controller } from '../master';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';
import { MasterService } from '../master.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  form: FormGroup;
  master: RequestController = new RequestController();
  siteId: number;
  unitId: number;
  nextBtn = false;
  masterController: Controller;
  assocMasterController: Controller;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.unitId = +this.route.snapshot.paramMap.get('unitId');

    this.globalService.unit.set(this.unitId);
    this.globalService.site.data$.subscribe(res => this.siteId = res.id);

    combineLatest([
      this.masterService.getAllControllers(this.unitId),
      this.masterService.getAssociatedControllers(this.unitId)
    ])
      .pipe(
        map(([allControllers, associatedControllers]) => ({ allControllers, associatedControllers }))
      )
      .subscribe(res => {
        this.masterController = res.allControllers.data.find(item => ['RC', 'CC', 'AC'].includes(item.model));
        this.assocMasterController = res.associatedControllers.data.find(item => ['RC', 'CC', 'AC'].includes(item.model));

        if (this.assocMasterController) {
          this.masterController.serial_no = this.assocMasterController.serial_no;
          this.nextBtn = true;
        }
      });
  }



}
