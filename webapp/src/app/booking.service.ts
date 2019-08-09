import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking } from './booking';
import { Observable, throwError } from "rxjs";
import * as dateformat from 'dateformat'; 

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor( private http: HttpClient ) {

  }

  public async getBooking(bookingId: string): Promise<Booking> {

    const  params = new  HttpParams().set('bookingId', bookingId)
    let booking = await this.http.get<Booking>( API_URL + '/booking/byBookingId', {params}).toPromise();

    return booking;
  }
  // API: GET /groups
  public async getAllBookings(groupId: string): Promise<[Booking]> {
    // will use this.http.get()
    const  params = new  HttpParams().set('groupId', groupId)
    let bookings = await this.http.get<[Booking]>( API_URL + '/booking', {params}).toPromise();
    console.log(bookings);
    
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

  private formatDate(date : Date) : Date {
    console.log("date received");
    console.log("formatted date", dateformat(date, 'isoDateTime'));
    return new Date(dateformat(date, 'isoDateTime'));
  }
}
