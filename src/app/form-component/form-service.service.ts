import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from '../model/coordinates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
    private _url:string ="/assets/node-api/autoCoordinate.json";
  constructor(private http: HttpClient) { }
  getData(): Observable<Coordinates[]>
  {
    //console.log("can you reach me");
    //console.log(this.http.get('/api/getDatarama'));

   //this.http.get('/api/getDatarama');
    //console.log(this.http.get<Coordinates[]>(this._url));
    return this.http.get<Coordinates[]>(this._url);
  
  

  }
}
