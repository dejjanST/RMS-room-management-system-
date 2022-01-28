import { TestBed } from '@angular/core/testing';

import { LanguageInterceptorService } from './language-interceptor.service';

describe('LanguageInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageInterceptorService = TestBed.get(LanguageInterceptorService);
    expect(service).toBeTruthy();
  });
});
