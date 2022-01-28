import { IVedMeta } from '../ved-meta';
import { HttpHeaders } from '@angular/common/http';

export class VedMetaError implements IVedMeta {

    readonly headKey = 'X-VedMeta-errors';
    uuid: string;
    params = new VedMetaErrorsParams();
    req: any;
    res: any;

    toHeader(): HttpHeaders {
        throw new Error('Method not implemented.');
    }
}

export class VedMetaErrorsParams {
    exclude = [];
    constructor(params?) {
        this.exclude = (params) ? params.exclude : [];
    }
}


export class HttpErrorLogModel {
    status: number;
    url: string;
    message: string;
    serverTime: string;
    clientTime: Date;
}
