import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        LanguagesModule,
        MatMenuModule,
        LoaderModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      http = TestBed.inject(HttpTestingController);
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    });
  }));

  afterEach(() => {
    http.verify();
  });

  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it(`should have as title 'rmss'`, () => {
    expect(app.title).toEqual('rmss');
  });

  it('change Filter should change showFiller propertie', () => {
    app.showFiller = true;
    app.changeFiller();

    expect(app.showFiller).toBeFalse();
  });


});
