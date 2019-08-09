import { User } from './user';

// attendeeList is formatted list of attendee names

export class Booking {
  name: string;
  startTime: Date;
  endTime: Date;
  venue: string;
  attendees: [User];
  attendeeList: string[];
  group: string;
  active: boolean;
  attachementPath: string;
  createdBy: string;
  displayDateTime: String;
}
