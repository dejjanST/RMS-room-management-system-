import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
    });
    service = TestBed.inject(FileUploadService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
