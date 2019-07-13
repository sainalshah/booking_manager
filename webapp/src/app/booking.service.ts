import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking } from './booking';
import { Observable, throwError } from "rxjs";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor( private http: HttpClient ) {

  }

  // API: GET /groups
  public async getAllBookings(groupId: string): Promise<[Booking]> {
    // will use this.http.get()
    const  params = new  HttpParams().set('groupId', groupId)
    let bookings = await this.http.get<[Booking]>( API_URL + '/booking', {params}).toPromise();
    console.log(bookings);
    bookings.map(booking => {
      booking.attendees.map(attendee => {
        booking.attendeeList = "";
        booking.attendeeList = booking.attendeeList + attendee.firstName + ", ";
      })

      booking.attendeeList = booking.attendeeList.slice(0, -2);
    });
    return bookings;
  }

  // API: POST /groups
  public async saveBooking(booking: Booking) {
    return await this.http.post<any>(API_URL + '/booking', booking).toPromise();
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
