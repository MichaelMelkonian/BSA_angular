import { Component, OnInit,Input } from '@angular/core';
import { bookings } from '../model/bookings';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  @Input() Bookings?:any | undefined;
  public bookList: bookings[] =[];

  session: any;

  constructor() { }

  ngOnInit(): void {
    const local = localStorage;
    // let data = localStorage.getItem('session');
    // console.log(JSON.parse(data));
    for(var key in local)
    {
      if(JSON.parse(localStorage.getItem(key)) != null)
      {
        this.bookList.push(JSON.parse(localStorage.getItem(key)))

      }
      
      console.log(key)
      console.log(JSON.parse(localStorage.getItem(key)))
    
    }
   console.log(this.bookList);
  }

  removeReservations(x:any)
  {
    localStorage.removeItem(x);
  }
}
