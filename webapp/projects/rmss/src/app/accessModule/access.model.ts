import { ACLListItem } from '../access-list.model';

export class ResponseGroupList {
  data: Array<AccessListData>;
}

export class ResponseAccessList {
  data: AccessListData;
}

export class AccessListData {
  id: number;
  name: string;
  type: number;
  color: string;
  force: boolean;
  groups?: Array<any> = [];
  // TODO: check this
  acl?: Array<ACLListItem>;
}

export class RequestAccessGroup {
  name: string;
  type: number;
  color: string;
  acl: Array<ACLListItem>;
  buildings: Array<any>;
  floors: Array<any>;
  units: Array<any>;
}
