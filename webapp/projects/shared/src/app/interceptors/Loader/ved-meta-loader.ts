import { IVedMeta } from '../ved-meta';
import { HttpHeaders } from '@angular/common/http';

export class VedMetaLoader implements IVedMeta {
    readonly headKey = 'X-VedMeta-loader';
    uuid: string;
    params = new VedMetaLoaderParams();
    req: any;
    res: any;

    toHeader(): HttpHeaders {
        let header = new HttpHeaders();
        header = header.append(this.headKey, JSON.stringify(this.params));
        return header;
    }
}


export class VedMetaLoaderParams {
    exclude = false;
    debounce = 100;

    constructor(params?) {
        this.exclude = (params) ? params.exclude : false;
        this.debounce = (params) ? params.debounce : 100;
    }
}
