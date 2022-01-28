export class ResponseBuildingList {
  data: BuildingData[] = [];
}

export class Building {
  data: BuildingData = new BuildingData();
}

export class BuildingData {
  id: number;
  name: string;
  desc: string;
  file_id: number;
  client_id: number;
  site_id: number;
  site_name: string;
  client_name: string;
  client_code: number;
  site_code: number;
  selected?: boolean;
  checked?: boolean;
  checkedState?: string;
}

export class BuildingSearch {
  site: number;
  name: string;
}
