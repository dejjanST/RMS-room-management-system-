import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { VedMetaLoaderParams, VedMetaLoader } from './ved-meta-loader';
import { filter, map, tap } from 'rxjs/operators';
import { VedMetaToastrParams, VedMetaToastr } from '../toastr/ved-meta-toastr';

@Injectable({
  providedIn: 'root'
})


export class RequestLoaderService {


  httpRequests: Array<VedMetaLoader> = [];

  private loaderSubject = new Subject<VedMetaLoader[]>();
  public loaderSubject$ = this.loaderSubject.asObservable();

  constructor() { }

  addRequest(vedMetaLoader: VedMetaLoader) {
    vedMetaLoader.uuid = vedMetaLoader.req.headers.get('X-VedMeta-uuid');

    this.httpRequests.push(vedMetaLoader);
    this.loaderSubject.next(this.httpRequests);
  }


  removeRequest(vedMetaLoader: VedMetaLoader): void {
    // should remove coresponding HttpRequest
    const uuid = vedMetaLoader.req.headers.get('X-VedMeta-uuid');
    // console.log('removing' + uuid);
    this.httpRequests = this.httpRequests.filter(item => {
      return item.uuid !== uuid;
    });

    this.loaderSubject.next(this.httpRequests);
  }

}
