import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailerSettingsData } from './mailer-settings.model';
import { MailerSettingsService } from './mailer-settings.service';


@Component({
  selector: 'app-mailer-settings',
  templateUrl: './mailer-settings.component.html',
  styleUrls: ['./mailer-settings.component.css']
})
export class MailerSettingsComponent implements OnInit {
  form: FormGroup;
  mailTo: FormControl = new FormControl('', [Validators.required, Validators.email]);
  hidden = true;
  testSucces = false;

  constructor(
    private fb: FormBuilder,
    private mailerSettingsService: MailerSettingsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      hostName: ['', Validators.required],
      port: ['', [Validators.required, Validators.max(65535)]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      protocol: ['', Validators.required],
    });

    this.mailerSettingsService.get().subscribe(res => {
      this.form.get('email').setValue(res.data.email);
      this.form.get('hostName').setValue(res.data.host_name);
      this.form.get('port').setValue(res.data.port);
      this.form.get('userName').setValue(res.data.user_name);
      this.form.get('password').setValue(res.data.password);
      this.form.get('protocol').setValue(res.data.protocol);
    });

    this.form.valueChanges.subscribe(() => this.testSucces = false);
  }


  createRequestObject(): MailerSettingsData {
    const reqEmailSettings = new MailerSettingsData();
    reqEmailSettings.email = this.form.get('email').value;
    reqEmailSettings.host_name = this.form.get('hostName').value;
    reqEmailSettings.port = this.form.get('port').value;
    reqEmailSettings.user_name = this.form.get('userName').value;
    reqEmailSettings.password = this.form.get('password').value;
    reqEmailSettings.protocol = this.form.get('protocol').value;
    reqEmailSettings.email_to = this.mailTo.value;

    return reqEmailSettings;
  }


  testEmail() {
    this.mailerSettingsService.test(this.createRequestObject())
      .subscribe(() => this.testSucces = true);
  }

  submit() {
    this.mailerSettingsService.create(this.createRequestObject())
      .subscribe();
  }

}
