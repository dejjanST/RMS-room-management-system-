import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Controller } from '../master';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MasterService } from '../master.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.css']
})
export class ControllersComponent implements OnInit {
  form: FormGroup;
  unitId: number;
  buildingId: number;
  siteId: number;
  allControllers: Array<Controller> = [];
  associatedControllers: Array<Controller> = [];
  showControllers: Array<Controller> = [];

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private route: ActivatedRoute,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.unitId = +this.route.snapshot.paramMap.get('unitId');
    this.globalService.unit.set(this.unitId);
    // siteId is required for POST request
    this.globalService.site.data$.subscribe(res => this.siteId = res.id);
    // buildingId is required for redirect to unit list, when click on Finish link
    this.globalService.building.data$.subscribe(res => this.buildingId = res.id);

    this.form = this.fb.group({
      controllerID: ['', [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
    this.showControllers = [];
    combineLatest([
      this.masterService.getAllControllers(this.unitId),
      this.masterService.getAssociatedControllers(this.unitId)
    ])
      .pipe(
        map(([allControllers, associatedControllers]) => ({ allControllers, associatedControllers }))
      )
      .subscribe(res => {
        this.allControllers = res.allControllers.data.filter(item => !['RC', 'CC', 'AC'].includes(item.model));
        this.associatedControllers = res.associatedControllers.data.filter(item => !['RC', 'CC', 'AC'].includes(item.model));

        this.calculateShowControllers();
      });
  }

  calculateShowControllers() {
    this.allControllers = this.allControllers.map(item => {
      item.isAssociated = false;
      return item;
    });
    this.allControllers.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        this.showControllers.push(JSON.parse(JSON.stringify(item)));
      }
    });

    // map controoler if is associated
    this.showControllers = this.showControllers.map((controller, index) => {
      const associated = this.associatedControllers.find(assocController => assocController.position === index);
      if (associated) {
        controller.serial_no = associated.serial_no;
        controller.isAssociated = true;
      }
      return controller;
    });
  }

}
