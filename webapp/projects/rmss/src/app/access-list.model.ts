import { AccessListData } from './accessModule/access.model';

export class ACLList {
    list: Array<ACLListItem> = [];
}
export class ACLListItem {
    building: ACLItem;
    floor: ACLItem;
    unit: ACLItem;
    exclude: boolean;
    md5: string | Int32Array;
    manual = false;
    groups: Array<AccessListData>;
    keep?: boolean;

}
export class ACLItem {
    id: number;
    name: string;
}
