import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BookingService } from '../booking.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  displayedColumns: string[] = ['datetime', 'venue', 'attendees', 'createdBy'];

  groupId: string;
  bookings: Booking [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private bookingService: BookingService) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params.groupId;
    });
  }

  ngOnInit() {
    this.loadBookings();
  }

  async loadBookings() {
    this.bookings = await this.bookingService.getAllBookings(this.groupId);
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
