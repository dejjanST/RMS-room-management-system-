import { VedTitleDirective } from './ved-title.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

@Component({
  template: '<p vedTitle>Testing VedTitleDirective</p>'
})
class TestComponent {
  constructor() { }
}

describe('VedTitleDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        VedTitleDirective
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        titleService = TestBed.get(Title);
        fixture.detectChanges();
      });

  }));



  // it('should create component', () => {
  //   expect(component).toBeDefined();
  // });


  // it('should set title from <p> element value', () => {
  //   const debugEl: HTMLElement = fixture.debugElement.nativeElement;
  //   const p: HTMLElement = debugEl.querySelector('p');

  //   expect(titleService.getTitle()).toEqual(p.innerHTML);
  // });

});
