export class ResponseControllers {
  data: Controller[] = [];
}

export class Controller {
  id: number;
  serial_no: string;
  equipment_type: string;
  description: string;
  model: string;
  category: string;
  quantity: number;
  device_type: number;
  position: number;
  isAssociated: boolean;
}

export class RequestController {
  serial_no: string;
  site_id: number;
  unit_id: number;
  position: number;
  card_holder: boolean;
  device_type: number;
  force?: boolean;
}