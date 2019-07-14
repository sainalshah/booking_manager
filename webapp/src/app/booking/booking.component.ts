import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BookingService } from '../booking.service';
import { Booking } from '../booking';
import { GroupService } from '../group.service';
import { Group } from '../group';
import * as dateFormat from 'dateformat';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  displayedColumns: string[] = ['datetime', 'venue', 'attendees', 'createdBy'];

  groupId: string;
  group: Group;
  bookings: Booking [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private bookingService: BookingService, private groupService: GroupService) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params.groupId;
    });
  }

  async loadGroup(){
      this.group = await this.groupService.getByGroupId(this.groupId);
      console.log( "group retrieved", this.group);
  }
  ngOnInit() {
      this.loadGroup();
      this.loadBookings();
  }

  async loadBookings() {
    let bookings = await this.bookingService.getAllBookings(this.groupId);
    this.bookings = this.formatDate(bookings);
    console.log("bookings: ", this.bookings);
  }

  formatDate(bookings: Booking []){
      bookings.map( booking => {
            let startDay = dateFormat(booking.startTime, 'dd/mm/yyyy');
            let endDay = dateFormat(booking.endTime, 'dd/mm/yyyy');
            console.log("startDay is ", startDay, "endDay is ", endDay);
            if(startDay === endDay){
                let startTime = dateFormat(booking.startTime, 'h:MM:ss TT');
                let endTime = dateFormat(booking.endTime, 'h:MM:ss TT');
                booking.displayDateTime = startDay + " " + startTime + " - " + endTime;
                } else {
                    booking.displayDateTime = dateFormat(booking.startTime, 'dd/mm/yyyy h:MM:ss TT') + " - " + dateFormat(booking.endTime, 'dd/mm/yyyy h:MM:ss TT');
                }
      });
      return bookings;
  }

  addBooking(): void {
    const dialogRef = this.dialog.open(AddBookingComponent, {
      width: '75%',
      data: {groupId: this.groupId}
    });

    dialogRef.afterClosed().subscribe(isBookingAdded => {
      console.log('The dialog was closed', isBookingAdded);
      // this.animal = result;
      if (isBookingAdded){
        this.loadBookings();
      }
    });
  }

}
