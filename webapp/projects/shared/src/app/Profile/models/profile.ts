export class ResponseProfile {
  id: number;
  email: string;
  active: boolean;
  first_name: string;
  last_name: string;
}

export class PostProfile {
  first_name: string;
  last_name: string;
  current_password: string;
  new_password: string;
  retyped_password: string;
}
