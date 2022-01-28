import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VerificationService } from './verification.service';
import { VerificationReport } from './verification-report.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  timestamp = new Date();
  verificationReport: VerificationReport = new VerificationReport();
  formGroup: FormGroup;
  buildingId: number;

  constructor(
    private route: ActivatedRoute,
    public globalService: GlobalService,
    public verificationService: VerificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildingId = +this.route.snapshot.paramMap.get('buildingId');

    this.globalService.building.set(this.buildingId);

    this.formGroup = this.formBuilder.group({
      floor_number: [''],
      unit_name: [''],
      equipment: [''],
      status: [''],
    });

    this.formGroup.valueChanges
      .pipe(
        debounceTime(333),
        distinctUntilChanged((oldItem, newItem) => {
          return (
            oldItem.floor_number === newItem.floor_number &&
            oldItem.unit_name === newItem.unit_name &&
            oldItem.equipment === newItem.equipment &&
            oldItem.status === newItem.status);
        }),
        startWith({}),
      )
      .subscribe(res => {
        this.verificationService.getList(this.buildingId, res).subscribe(response => {
          this.verificationReport = response;
        });
      });
  }
  print() {
    window.print();
  }
}
