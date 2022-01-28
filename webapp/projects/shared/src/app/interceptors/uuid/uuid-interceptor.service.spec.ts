import { TestBed } from '@angular/core/testing';

import { UuidInterceptorService } from './uuid-interceptor.service';

describe('UuidInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UuidInterceptorService = TestBed.get(UuidInterceptorService);
    expect(service).toBeTruthy();
  });
});
