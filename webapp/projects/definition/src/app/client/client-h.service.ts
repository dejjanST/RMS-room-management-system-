import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { AHierarchy } from '../globalService/ahierarchy';
import { ClientData } from './client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientHService extends AHierarchy {
  data$: Observable<ClientData> = this.dataSubject.asObservable();

  constructor(protected clientService: ClientService) {
    super();
    this.service = clientService;
    this.init();
  }
}
