
export class SSFloorList {
    data: Array<SSFloorData>;
}

export class SSFloorData {
    id: number;
    name: string;
    building_id: number;
    building_name: string;
    floor_no: number;
    child_count: number;
    parent_id?: number;
}
