import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(file: File, type: string, id?: number): Observable<any> {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('upload_file', file, file.name);
    if (type) {
      uploadData.append('type', type);
    }
    if (id) {
      uploadData.append('id', id.toString());
    }
    return this.http.post('/api/file/upload/', uploadData, {
      reportProgress: true,
      observe: 'events'
    });


  }
}
