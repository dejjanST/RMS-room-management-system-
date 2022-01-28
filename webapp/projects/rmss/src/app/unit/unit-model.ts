
export class SSUnitList {
    data: Array<SSUnitData>;
}
export class SSUnitData {
    id: number;
    name: string;
    floor_id: number;
    child_count: number;
    parent_id?: number;
}
