import { Site } from '../site/site';

export class FloorLayoutsBySideList {
    data: FloorLayout[];
}

export class FloorLayout {
    id: number;
    name: string;
    file_id: number;
    site_code?: number;
    site_id: number;
    site_name?: string;
    locked: boolean;
}

export class ResponseFloorLayout {
    data: RequestFloorLayout = new RequestFloorLayout();
}

export class RequestFloorLayout {
    name: string;
    file_id: number;
    site_id: number;
    locked: boolean;
    units: Unit[] = [];
}


export class Unit {
    id: number;
    unit_type: number;
    unit_no: number;
    unit_type_name: string;
    pos: UnitPosition = new UnitPosition();
}
export class UnitPosition {
    x: number;
    y: number;
}
