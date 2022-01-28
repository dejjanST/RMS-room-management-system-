export class UserRequestModel {
    email: string;
    password: string;
    captcha: any;
    company: Company;
}

export class Company{
  id: number;
  name: string;
}
