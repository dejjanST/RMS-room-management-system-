import { TestBed } from '@angular/core/testing';
import { SiteHService } from './site-h.service';
import { SiteService } from '../site/site.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ClientHService } from '../client/client-h.service';
import { siteMock1, siteMock2 } from '../../mocked-data/site-data';


describe('SiteHService', () => {
  let service: SiteHService;
  let siteService: any;
  let clientHService: any;

  beforeEach(() => {
    const siteServiceSpy = jasmine.createSpyObj('SiteService', ['get'], { updated$: of() });
    const clientHServiceSpy = jasmine.createSpyObj('ClientHService', ['set']);
    TestBed.configureTestingModule({
      providers: [
        { provide: SiteService, useValue: siteServiceSpy },
        { provide: ClientHService, useValue: clientHServiceSpy }
      ]
    });
    service = TestBed.inject(SiteHService);
    siteService = TestBed.inject(SiteService);
    clientHService = TestBed.inject(ClientHService);
    siteService.get.and.returnValue(of(siteMock1));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make one request to API when requested same item multiple times', () => {
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(siteMock1.data);
    });
    service.set(1);
    service.set(1);
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(siteMock1.data);
    });
    service.set(1);
    expect(siteService.get).toHaveBeenCalledTimes(1);
  });


  it('should make two requests to API when requested two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(siteMock1.data);
      });

    siteService.get.and.returnValue(of(JSON.parse(JSON.stringify(siteMock2))));
    service.set(2);
    service.data$.subscribe(res => {
      expect(res).toEqual(siteMock2.data);
    });
    expect(siteService.get).toHaveBeenCalledTimes(2);
  });


  it('should make two requests to API when requested multiple times in a row for two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(siteMock1.data);
      });
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(siteMock1.data);
      });
    siteService.get.and.returnValue(of(JSON.parse(JSON.stringify(siteMock2))));
    service.set(2);
    service.set(2);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(siteMock2.data);
      });
    expect(siteService.get).toHaveBeenCalledTimes(2);
  });
});
