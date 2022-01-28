import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export interface ISSEntity {
    params: HttpParams;

    getList(id: number): Observable<any>;
}

export abstract class ASSEntity implements ISSEntity {
    params: HttpParams;

    createFilterParams(filter: any) {
        this.params = new HttpParams();
        for (const key in filter) {
            if (key) {
                this.params = this.params.append(key, filter[key]);
            }
        }
    }

    getList(id: number): Observable<any> {
        throw new Error("Method not implemented.");
    }


}
