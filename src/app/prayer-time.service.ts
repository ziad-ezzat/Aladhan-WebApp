import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimeService {
  [x: string]: any;

  apiUrl = 'https://api.aladhan.com/v1/calendarByCity';

  constructor(private http: HttpClient) { }

  getPrayerTimes(year: String, month: String, city: string) {
    return this.http.get(`${this.apiUrl}/${year}/${month}?city=${city}&country=Egypt&method=5`);
  }
}
