import { Component, OnInit } from '@angular/core';
import { PrayerTimeService } from '../prayer-time.service';

@Component({
  selector: 'app-prayer-times',
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css']
})
export class PrayerTimesComponent implements OnInit {

  city = '';
  prayerTimes: any[] = [];
  loading = false;
  today = new Date().getDate();
  nextDays: Map<number,String> = new Map<number,String>();
  chosenDay = this.today;

  constructor(private prayerTimeService: PrayerTimeService) {
    this.calculateCurentDayAndNextDays();
  }

  ngOnInit() {
    this.getPrayerTimes();
  }

  getPrayerTimes() {
    this.loading = true;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    this.prayerTimeService.getPrayerTimes(year.toString(), month.toString(), this.city)
      .subscribe((data: any) => {
        this.prayerTimes = data.data;
        this.loading = false;
      });
  }

  getDayDisplay(date: string): string {
    if(this.chosenDay < 10)
      if (date.substring(0, 2) == '0' + this.today.toString()) {
        return 'Today';
      } else if (date.substring(0, 2) == '0' + (this.today+1).toString()) {
        return 'Tomorrow';
      } else {
        return date;
      }
    else
    if (date.substring(0, 2) == this.today.toString()) {
      return 'Today';
    } else if (date.substring(0, 2) == (this.today+1).toString()) {
      return 'Tomorrow';
    } else {
      return date;
    }
  }

  calculateCurentDayAndNextDays() {
    this.nextDays.set(this.today,"Today");
    this.nextDays.set(this.today+1,"Tomoroow")
    for (let i = 2; i <= 4; i++) {
      const nextDay = this.today + i;
      if(nextDay < 31)
        this.nextDays.set(nextDay,nextDay.toString());
    }
  }

  shouldDisplayDay(date: string): boolean {
    if(this.chosenDay < 10)
      if (date.substring(0, 2) == '0' + this.chosenDay.toString()) 
        return true;
      else
        return false
    else
    if (date.substring(0, 2) == this.chosenDay.toString()) 
      return true;
    else
      return false
  }
}