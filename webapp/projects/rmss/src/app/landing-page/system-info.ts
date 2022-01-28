export class SystemInfo {
  data: System = new System();
}

export class System{
  site_name: string;
  client_name: string;
  last_modification: number;
  uptime: number;
  partner_id: number;
  serial_number: string;
}
