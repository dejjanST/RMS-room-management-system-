export class RequestUnitType {
    name: string;
    rooms: number;
    description: string;
    equipment: SelectedEquipment[] = [];
    locked: boolean;
}

export class SelectedEquipment {
    id: number;
    q: number;
}

export class ResponseUnitTypeList {
    data: ResponseUnitType[];
}

export class ResponseGetUnitType {
    data: ResponseUnitType;
}

export class ResponseUnitType {
    id: number;
    name: string;
    rooms: number;
    quantity: number;
    master_controller_model: string;
    description: string;
    locked: boolean;
    updated: number;
    deleted: boolean;
    equipment: SelectedEquipment[];
    unitDetails: UnitDetails;
    unit_no: number;
}
export class UnitDetails {
    positionX = 0;
    positionY = 0;
    initialPosX = 0;
    initialPosY = 0;
    transform() {
        return `translate3d(${this.positionX}px, ${this.positionY}px, 0px)`;
    }
}

export class FilterFCU {
    pipes = '.+';
    speed = '.+';
    valve = '.+';
    filter() {
        return this.pipes + ' - ' + this.speed + this.valve;
    }
}

export class FilterWS {
    pipes = '.+';
    valve = '.+';
    filter() {
        return this.pipes + '.+' + this.valve;
    }
}
