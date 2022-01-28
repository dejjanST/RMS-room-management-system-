export class EquipmentsByUnit {
    data: Array<Equipment>;
}

export class Equipment {
    utd_has_equipment: number;
    category: string;
    equipment_type: string;
    model: string;
    description: string;
    status: number;
    setStatus: number;
    note: string;
    siteId: number;
}

export class RequestEquipment {
    utd_has_equipment: number;
    status: number;
    site_id: number;
    note: string;
}



