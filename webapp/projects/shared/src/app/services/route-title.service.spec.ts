import { TestBed } from '@angular/core/testing';
import { RouteTitleService } from './route-title.service';

xdescribe('RouteTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteTitleService = TestBed.inject(RouteTitleService);
    expect(service).toBeTruthy();
  });
});
