import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from 'projects/shared/src/app/components/toolbar/toolbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ToolbarComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('change Filter should change showFiller propertie', () => {
    app.showFiller = true;
    app.changeFiller();

    expect(app.showFiller).toBeFalse();
  });


  // it(`should have as title 'Site Definiton'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(app.title).toEqual('Site Definiton');
  // });


});
