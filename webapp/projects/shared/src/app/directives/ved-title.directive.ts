import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Directive({
  selector: '[vedTitle]'
})
export class VedTitleDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.el.nativeElement.innerText);
  }
}
