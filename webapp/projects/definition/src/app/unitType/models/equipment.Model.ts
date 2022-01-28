export interface Equipments {
    data: Array<Equipment>;
}

export class Equipment {
    id: number;
    category: string;
    equipment_type: string;
    model: string;
    hv: number;
    lv: number;
    av: number;
    ro: number;
    ti: number;
    di: number;
    tidi: number;
    description: string;
    selected: boolean;
    quantity: number;
    disabled: boolean;
    _shouldDisable: boolean;
    showQtyErrorClass: boolean;
    _quantity: number;
}
