import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../site.service';
import { Site } from '../site';
import { Client } from '../../client/client.model';
import { GlobalService } from '../../globalService/global.service';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  form: FormGroup;
  siteId: number;
  clientId: number;
  companyId: number;
  code: string;
  site: Site = new Site();
  client: Client = new Client();

  constructor(
    private fb: FormBuilder,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private siteService: SiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('clientId');
    this.siteId = +this.route.snapshot.paramMap.get('siteId');

    this.globalService.user$.subscribe(
      res => {
        this.companyId = res.company.id;
      }
    );
    this.initForm();
    this.globalService.client.set(this.clientId);
    this.globalService.client.data$.subscribe(client => {
      this.client.data = client;
      this.form.get('country').setValue(client.country);
      this.form.get('city').setValue(client.city);
      this.form.get('address').setValue(client.address);
    }
    );

    // edit site
    if (this.siteId > 0) {
      this.globalService.site.set(this.siteId);
      this.globalService.site.data$.subscribe(
        res => {
          if (Object.keys(res).length) {
            this.form.get('name').setValue(res.name);
            this.code = res.site_id.toString().slice(this.companyId.toString().length);
            this.form.get('site_id').setValue(this.code);
            this.form.get('client_id').setValue(res.client_id);
            this.form.get('country').setValue(res.country);
            this.form.get('city').setValue(res.city);
            this.form.get('address').setValue(res.address);
            this.form.get('serial_no').setValue(res.serial_no);
          }
        }
      );
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, VedValidators.minLength(3)]],
      site_id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      client_id: [this.clientId],
      country: [''],
      city: [''],
      address: [''],
      serial_no: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.site.data.name = this.form.get('name').value;
    this.site.data.site_id = +(this.companyId + '' + this.form.get('site_id').value);
    this.site.data.country = this.form.get('country').value;
    this.site.data.city = this.form.get('city').value;
    this.site.data.address = this.form.get('address').value;

    if (this.siteId > 0) {
      this.site.data.id = this.siteId;
      this.siteService.update(this.site).subscribe(
        res => {
          this.router.navigate(['clients', this.clientId, 'sites']);
        }
      );
    }
    else {
      this.site.data.client_id = +this.form.get('client_id').value;
      this.siteService.create(this.site).subscribe(
        res => {
          this.router.navigate(['clients', this.clientId, 'sites']);
        }
      );
    }
  }
}
