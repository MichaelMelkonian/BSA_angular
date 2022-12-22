import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Businesses } from './model/businesses';
import { singBus } from './model/singBus';
import { reviewCol } from './model/reviewsCol';
import { auto } from './model/auto';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }
  async getData(query: string)
  {

   
    return this.http.get<{[key:string]:Businesses}>('api/getDatarama/'+query);

  }
  async getSingle(query: string)
  {

    console.log(query)
    return this.http.get<{[key:string]:singBus}>('api/getSingo/'+query);

  }
  async getRev(query: string)
  {

    console.log(query)
    return this.http.get<{[key:string]:reviewCol}>('api/getReview/'+query);

  }
  async autoService(query: string)
  {

    console.log(query)
    return this.http.get<{[key:string]:auto}>('api/autoCom/'+query);

  }
}
