import { ACLListItem } from '../../access-list.model';
import { AccessListData } from '../access.model';

export class ResponseKeyList {
  data: KeyData[] = [];
}

export class Key {
  data: KeyData = new KeyData();
}

export class KeyData {
  id: number;
  key_no: string;
  description: string;
  key_type: number;
  valid_from: number;
  valid_to: number;


  acl: Array<ACLListItem>;
  // acl: ACLList;
  buildings?: Array<any>;
  floors?: Array<any>;
  units?: Array<any>;
  groups?: Array<any>;
}


export class ResponseKeyTypes {
  data: KeyType[] = [];
}

export class KeyType {
  id: number;
  type: string;
}

export class RequestKeyAccess {
  key_id: number;
  groups: Array<AccessListData>;
  acl: Array<ACLListItem>;

  //Todo: Da se trgnev
  buildings: Array<AccessItems>;
  floors: Array<AccessItems>;
  units: Array<AccessItems>;
}

class AccessItems {
  id: number;
  name: string;
}
