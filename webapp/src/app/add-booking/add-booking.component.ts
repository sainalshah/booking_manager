import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import { User } from '../user';
import { Booking } from '../booking';
import { GroupService } from '../group.service';
import { BookingService } from '../booking.service';
import { UserService } from "../user.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  groupId: string;
  members: User[];
  bookingId: string;
  isEditMode: boolean;
  isAddMode: boolean = true;
  newBooking: Booking = new Booking();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private groupService: GroupService, private bookingService: BookingService,
  private userService: UserService) {
    this.groupId = data.groupId;
    this.isEditMode = data.editMode;
    this.bookingId = data.bookingId;
    console.log("bookingId: ", this.bookingId);
  }

  async ngOnInit() {
    console.log("retreiving groupbyId");
    let group = await this.groupService.getByGroupId(this.groupId);
    console.log("received group");
    this.members = group.members;
    console.log("members set", this.members);
    console.log("bookingId: ", this.bookingId);
    if (this.bookingId != null){
        this.isAddMode = false;
        this.newBooking = await this.bookingService.getBooking(this.bookingId);
        console.log("booking retrieved", this.newBooking);
    }
  }

  addBooking(): void {
    console.log("adding new booking", this.newBooking);
    const user = this.userService.userBS.value;
    this.newBooking.createdBy = user._id;
    this.newBooking.group = this.groupId;
    this.bookingService.saveBooking(this.newBooking);
  }

}
