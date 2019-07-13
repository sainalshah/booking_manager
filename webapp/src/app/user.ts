import { SocialUser } from "angularx-social-login";

export class User extends SocialUser {
  _id: string;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}
