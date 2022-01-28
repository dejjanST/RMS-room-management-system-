import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { ClientStatus, ClientData, Client } from '../client.model';
import { GlobalService } from '../../globalService/global.service';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientId: number;
  form: FormGroup;
  client: Client = new Client();
  statuses = new ClientStatus(1);
  companyId: number;
  code: string;

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.globalService.user$.subscribe(
      res => {
        this.companyId = res.company.id;
      }
    );

    this.clientId = +this.route.snapshot.paramMap.get('clientId');

    if (this.clientId > 0) {
      this.globalService.client.set(this.clientId);
      this.globalService.client.data$.subscribe(res => {

        if (Object.keys(res).length) {
          this.form.get('name').setValue(res.name);
          this.code = res.client_id.toString().slice(this.companyId.toString().length);
          this.form.get('client_id').setValue(this.code);
          this.form.get('country').setValue(res.country);
          this.form.get('city').setValue(res.city);
          this.form.get('address').setValue(res.address);
          this.form.get('bank_account').setValue(res.bank_account);
          this.form.get('bank_name').setValue(res.bank_name);
          this.form.get('bank_country').setValue(res.bank_country);
          this.form.get('phone').setValue(res.phone);
          this.form.get('email').setValue(res.email);
          this.form.get('status').setValue(res.status);
        }
      }
      );
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, VedValidators.minLength(2)]],
      client_id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      country: [''],
      city: [''],
      address: [''],
      bank_account: [''],
      bank_name: [''],
      bank_country: [''],
      phone: [''],
      email: ['', [Validators.email]],
      status: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.client.data.name = this.form.get('name').value;
    this.client.data.client_id = +(this.companyId + '' + this.form.get('client_id').value);
    this.client.data.country = this.form.get('country').value;
    this.client.data.city = this.form.get('city').value;
    this.client.data.address = this.form.get('address').value;
    this.client.data.bank_account = this.form.get('bank_account').value;
    this.client.data.bank_name = this.form.get('bank_name').value;
    this.client.data.bank_country = this.form.get('bank_country').value;
    this.client.data.phone = this.form.get('phone').value;
    this.client.data.email = this.form.get('email').value;
    this.client.data.status = +this.form.get('status').value;

    if (this.clientId > 0) {
      this.client.data.id = this.clientId;
      this.clientService.update(this.client).subscribe(
        res => {
          this.router.navigate(['/clients']);
        }
      );
    }
    else {
      this.clientService.create(this.client).subscribe(
        res => {
          this.router.navigate(['/clients']);
        }
      );
    }
  }
}
