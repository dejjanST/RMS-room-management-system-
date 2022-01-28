import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesComponent } from './languages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesComponent],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Router, useValue: {
            url: '/component/param1',
            events: of(
              new NavigationEnd(
                0
                , '/component/param1'
                , '/component/param2')
            ),
          }
        },
        {
          provide: PlatformLocation, useValue: {
            getBaseHrefFromDOM(): string {
              return '/en/someAppLocation/';
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Tests if application is in subdirectory', () => {
    expect(component).toBeTruthy();
    expect(component.setLanguage('mk')).toEqual('/mk/someAppLocation/component/param1');
  });
  it('Tests to check Current Language', () => {
    expect(component).toBeTruthy();
    expect(component.currentLanguage).toEqual('en');
  });
});
