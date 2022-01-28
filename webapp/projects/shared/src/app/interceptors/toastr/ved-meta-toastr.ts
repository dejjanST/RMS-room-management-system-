import { IVedMeta } from '../ved-meta';
import { HttpHeaders } from '@angular/common/http';

export class VedMetaToastr implements IVedMeta {

    readonly headKey = 'X-VedMeta-toastr';
    uuid: string;
    params = new VedMetaToastrParams();
    req: any;
    res: any;

    toHeader(): HttpHeaders {
        let header = new HttpHeaders();
        header = header.append(this.headKey, JSON.stringify(this.params));
        return header;
    }
}

export class VedMetaToastrParams {
    exclude = [];
    constructor(params?) {
        this.exclude = (params) ? params.exclude : [];
    }
}
