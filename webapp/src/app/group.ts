import { User } from './user';

export class Group {

  name: string;
  members: [User];
  createdBy: string;
  memberList: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
