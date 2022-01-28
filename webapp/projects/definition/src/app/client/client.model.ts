export class ResponseClientsList {
  data: ClientData[] = [];
}

export class Client {
  data: ClientData = new ClientData();
}

export class ClientData {
  id: number;
  name: string;
  client_id: number;
  country: string;
  city: string;
  address: string;
  bank_account: string;
  bank_name: string;
  bank_country: string;
  status: number;
  phone: string;
  email: string;
}

export class ClientStatus {
  status = {
    1: {
      val: 1,
      label: 'Active'
    },
    2: {
      val: 2,
      label: 'Not Active'
    },
    3: {
      val: 3,
      label: 'Blocked'
    },
  };

  public val;

  public constructor(status) {
    this.val = this.status[status];
  }
}