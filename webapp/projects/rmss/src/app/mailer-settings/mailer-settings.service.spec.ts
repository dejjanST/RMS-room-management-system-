import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mailerSettingsMock } from './mailer-settings.mock';
import { MailerSettingsData } from './mailer-settings.model';
import { MailerSettingsService } from './mailer-settings.service';


describe('MailerSettingsService', () => {
  let service: MailerSettingsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MailerSettingsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('test get()', () => {
    service.get().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data).toEqual(mailerSettingsMock.data);
    });

    const req = http.expectOne('/api/settings/mailer/');
    expect(req.request.method).toBe('GET');
    req.flush(mailerSettingsMock);
  });



  it('test get() with repsonse error 409', () => {
    service.get().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.email).toEqual('');
    });

    const req = http.expectOne('/api/settings/mailer/');
    expect(req.request.method).toBe('GET');
    req.flush({ status: 409, statusText: 'not found ' });
  });


  it('test create()', () => {
    const mailerSettings = new MailerSettingsData();
    service.create(mailerSettings).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/settings/mailer/');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'succes' });
  });

  it('test test()', () => {
    const mailerSettings = new MailerSettingsData();
    service.test(mailerSettings).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/settings/mailer/test/');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'succes' });
  });


});
