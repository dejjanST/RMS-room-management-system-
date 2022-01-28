import { HttpHeaders } from '@angular/common/http';

export interface IVedMeta {
    readonly headKey: string;
    uuid: string;
    params: any;
    req: any;
    res: any;

    toHeader(): HttpHeaders;
}
