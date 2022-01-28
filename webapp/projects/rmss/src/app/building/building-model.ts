
export class SSBuildingList {
    data: Array<SSBuildingData>;
}

export class SSBuildingData {
    id: number;
    name: string;
    desc: string;
    file_id: number;
    child_count: number;
}
