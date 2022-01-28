export class ResponseFloorList {
  data: FloorData[] = [];
}

export class ResponseFloor {
  data: FloorData = new FloorData();
}

export class FloorData {
  id: number;
  floor_no: number;
  access_level?: number;
  building_id: number;
  building_name?: string;
  name: string;
  floor_layout_fileid: number;
  floor_layout_id: number;
  units: FloorUnit[] = [];
  selected?: boolean;
  checked?: boolean;
  checkedState?: string;
}

export class FloorUnit {
  id: number;
  unit_type?: number;
  unit_type_id?: number;
  unit_no: number;
  unit_type_name: string;
  name: string;
  pos: {
    x: number;
    y: number;
  };
}


export class FloorSearch {
  name: string;
  building_id: number;
}

export class RequestBulkData {
  data: BulkData = new BulkData();
}

export class BulkData {
  floor_from: number;
  floor_to: number;
  floor_layout_id: number;
  building_id: number;
  prefix: string;
}
