import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from '../../app.module';
import { keyListMock } from '../access-mock';
import { KeyService } from '../key.service';
import { AccessKeyComponent } from './access-key.component';


describe('AccessKeyComponent', () => {
  let component: AccessKeyComponent;
  let keyService: any;
  let fixture: ComponentFixture<AccessKeyComponent>;
  let keySpy: any;
  let routerSpy: any;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    keySpy = jasmine.createSpyObj('KeyService', ['getList']);
    routerSpy = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      declarations: [AccessKeyComponent],
      imports: [
        AppModule
      ],
      providers: [
        { provide: KeyService, useValue: keySpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    keyService = TestBed.inject(KeyService);
    keySpy.getList.and.returnValue(of(keyListMock));
    fixture = TestBed.createComponent(AccessKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create and getList should be called', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to key/2', () => {
    const key = {
      id: 2
    };
    component.edit(key);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/key', 2]);
  });

});
