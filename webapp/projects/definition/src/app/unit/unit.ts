import { Meta } from './meta';

export class ResponseUnitLst {
  meta: Meta = new Meta();
  data: UnitSearch[] = [];
}

export class UnitSearch {
  unit_id: number;
  building_id: number;
  f_name: string;
  f_number: number;
  u_name: string;
  u_number: number;
  per_page: number;
  model: string;
  page: number;
  stage: number;
  selected?: boolean;
  checked?: boolean;
  checkedState?: string;
}


export class ResponseUnit {
  data: UnitData;
}

export class UnitData {
  id: number;
  name: string;
  floor_id: number;
  deleted: boolean;
  floor_layout_has_utd: number;
  unit_no: number;
  stage: number;
  updated: number;
}