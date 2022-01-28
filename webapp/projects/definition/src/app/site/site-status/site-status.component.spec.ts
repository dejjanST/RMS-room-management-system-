import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SiteStatusComponent } from './site-status.component';
import { By } from '@angular/platform-browser';
import { SiteData } from '../site';
import { SiteStatusService } from './site-status.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('SiteStatusComponent', () => {
  let component: SiteStatusComponent;
  let fixture: ComponentFixture<SiteStatusComponent>;
  let siteStatusService: any;

  beforeEach(async(() => {
    const siteStatusServiceSpy = jasmine.createSpyObj('SiteStatusService', ['pushConfiguration']);
    TestBed.configureTestingModule({
      declarations: [SiteStatusComponent],
      imports: [MatIconModule],
      providers: [
        { provide: SiteStatusService, useValue: siteStatusServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    siteStatusService = TestBed.inject(SiteStatusService);
    siteStatusService.pushConfiguration.and.returnValue(of({ msg: 'Site configuration successfully set up' }));
    fixture = TestBed.createComponent(SiteStatusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.siteDetails = new SiteData();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('pushConfiguration() method should call once', fakeAsync(() => {
    component.siteDetails = new SiteData();
    fixture.detectChanges();
    component.pushConfiguration();
    expect(siteStatusService.pushConfiguration).toHaveBeenCalledTimes(1);
  }));



  it('site status content should be Commissioning and class atribute to be offline', () => {
    component.siteDetails = new SiteData();
    component.siteDetails.status = 0;
    component.siteDetails.mode = 2;
    fixture.detectChanges();

    const status = fixture.debugElement.query(By.css('#status'));
    expect(status.nativeElement.textContent).toBe('Commissioning');
    expect(status.nativeElement.getAttribute('class')).toBe('offline');
  });

  it('site status content should be Operational and class atribute to be online', () => {
    component.siteDetails = new SiteData();
    component.siteDetails.status = 1;
    component.siteDetails.mode = 3;
    fixture.detectChanges();

    const status = fixture.debugElement.query(By.css('#status'));
    expect(status.nativeElement.textContent).toBe('Operational');
    expect(status.nativeElement.getAttribute('class')).toBe('online');
  });
});
