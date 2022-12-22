import { Component,ElementRef,ViewChild, OnInit,AfterViewInit,Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from '../app-service.service';
import { response } from 'express';
import { generate } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coordinates } from '../model/coordinates';
import * as e from 'express';
import { Businesses } from '../model/businesses';
import { reviewCol } from '../model/reviewsCol';
import {BusinessCardComponent} from '../business-card/business-card.component';

import { ThisReceiver } from '@angular/compiler';
import { singBus } from '../model/singBus';
import { auto } from '../model/auto';



@Component({
  selector: 'form-component',
  templateUrl:'./form-component.component.html',
  styleUrls: ['./form-component.component.css']

  // `
  // <h2>Hello my name is Michael</h2>
  // <ul *ngFor="let employee of coordI">
  // <li>{{employee.city}}</li>
  // </ul>
  // `
})
export class FormComponentComponent implements OnInit{


  



  public businesses: Businesses[] = [];
  public theBusCard: Businesses[] = [];
  public busPool: singBus[] =[];
  public revPool: reviewCol[] =[];
  public autoCompleted: auto[] =[];

  public formSubmit = false;
  public cardSubmit = false;
  // ip: '69.236.221.103', 
  // hostname: '69-236-221-103.lightspeed.irvnca.sbcglobal.net', 
  // city: 'Los Angeles',
  // region: 'California', 
  // country: 'US',
  // loc: '34.0245,-118.1561',
  // org: 'AS7018 AT&T Services, Inc.',
  // postal: '90022',
  // timezone: 'America/Los_Angeles' 




@ViewChild('location') inputName: any;




  public he: any;
  holder: any;
  form: any;

  constructor(private service: AppServiceService){ }
 





  getBusCard($event: any)
  {
    //this.message=$event;
    console.log("EVENT",$event);
    this.formSubmit = false;
    this.cardSubmit = true;
    if(this.theBusCard.length >=1){
      this.theBusCard.splice(0,1);
    }
    this.theBusCard.push($event);
    console.log("The event that has been sent from the gen table comp",this.theBusCard);



    console.log("ID OF VAR?",this.theBusCard[0].id)
    this.getSingleBus(this.theBusCard[0].id)
    this.getThreeRev(this.theBusCard[0].id)
   // console.log("getBUScard",this.message);
    }




    goBack($event:boolean)
    {
      this.formSubmit=true;
      this.cardSubmit=false;
    }
  message: string;
  


  ngOnInit() {
 
    //console.log("DICTIONARY",this.getDataFromAPI());
    console.log("PRINT HE",this.he);
    //this.he = this.getDataFromAPI();
    console.log("PRINT HE3",this.he);
  }

  clearTable()
  {
    this.formSubmit = false;
    this.cardSubmit = false;
  }
  convertDistance(distanceVal:any)
  {
      let newValue = 0;

      newValue = distanceVal *1609.34;
      return newValue
  }
  async getValue(coordinates: any){
    //console.log("GERRR",ger);
    const parseVal = JSON.parse(coordinates);

    

    console.log(parseVal.loc);

    let splitCoord = (parseVal.loc).split(",");
   // console.log(splitCoord);
    splitCoord[0] = Number(splitCoord[0]);
    splitCoord[1] = Number(splitCoord[1]);
   console.log(splitCoord);
    
    return splitCoord;
    

  }
async deleteLocationValue(locationVal: any,disVal: any)
{

  console.log("DISVAL",disVal);
  if(disVal == "true")
  {
    console.log("LOCATION VAL",this.inputName.nativeElement.value);

    this.inputName.name = ' ';
    
  }
}





  disabledValue = "false";

  async detect(x:any)
  {

    if(x.viewModel == true)
    {
       
      this.disabledValue  = "true";
      
      return this.disabledValue;

    }
    else
    {
      return this.disabledValue  = "false";
    }
    
  }
   async log(x:any,y:any,z:any,a: any,b:any) { 
    let dicto = {
      'keyword': 'temp',
      'radius': 3,
      'categories': 'temp',
      'latitude':'temp',
      'longitude': 'temp'

    };

    this.cardSubmit = false;
    
    if (b.viewModel == true)
    {  
      //let coord = [1,2];

      
     // console.log("CORD",this.getDataFromAPI());
      
      //console.log("COORD",coord);
      //dicto['latitude'] = coord[0];
      //dicto['longitude'] = coord[1];

    }
    else
    {
      //call other function to get coordinate 
    }
    dicto['keyword'] = x.viewModel;
    dicto['radius']=(y.viewModel);
    dicto['categories'] = z.viewModel;

    if(b.viewModel == true)
    {
      dicto['latitude'] = b.viewModel;
      dicto['longitude'] = b.viewModel;
    }
    else
    {
      dicto['latitude'] = a.viewModel;
      dicto['longitude'] = a.viewModel;
    }
    
    




    console.log(dicto);
    var newString  = JSON.stringify(dicto);
    //var newString2  = JSON.parse(newString);
    console.log("NEW STRING",newString);
    // console.log(x.viewModel);
    // console.log(y.viewModel);
    // console.log(z.viewModel);
    // console.log(a.viewModel);
    // console.log(b.viewModel);
    
    //let resa = this.getDataFromAPI();
    //console.log("RESA",JSON.stringify(resa));
    //console.log(this.getDataFromAPI());




    this.formSubmit = true;

    let holding = await this.getDataFromAPI(newString);
    console.log("this is the holding variable: ",holding);

   }
   


public data: any;
public otherData: any;






   async getDataFromAPI(query:any)
   {
    return (await this.service.getData(query))
    .pipe(map((res) => {

      const test = Object.values(Object.values(res)[0]);
      const business = [];
      console.log("this is the res",res);
      console.log("TYPE OF THIS RES",Object.values(Object.values(res)[0])[0]);
      
        for(const key in Object.values(Object.values(res)[0]))
        {
          console.log("THIS IS THE res key",test[key])
          if(test.hasOwnProperty(key)) {
            business.push({...test[key], number:key})
          }
          console.log("this is whole",test);
        }
      return business;
    }))
    .subscribe((business) => {
      for(let bus of business)
      {
        bus.distance = (bus.distance * 0.000621371);
        bus.distance = Math.round(bus.distance)
        console.log("This is the business name",bus.name);
      }
      //console.log("businesssssss",Object.values(business));



      this.businesses = business;
      
      //this.data =Object.values(this.data)[2];
    })
    
   }

   async getSingleBus(query:any)
   {
    return (await this.service.getSingle(query))
    .subscribe((res) => {
     
      //console.log("businesssssss",Object.values(business));

      
      if(this.busPool.length >= 1)
      {
        this.busPool.splice(0,1);
      }
      this.busPool.push(res);
      console.log(this.busPool);
      //this.data =Object.values(this.data)[2];
    })
    
   }
   async getThreeRev(query:any)
   {
    return (await this.service.getRev(query))
    .pipe(map((res) => {

      const test = Object.values(Object.values(res)[0]);
      const business = [];
      console.log("this is the REVIEW res",res);
      console.log("TYPE OF THIS REVIEW RES",Object.values(Object.values(res)[0])[0]);
      
        for(const key in Object.values(Object.values(res)[0]))
        {
          console.log("this is the REVIEW res key",test[key])
          if(test.hasOwnProperty(key)) {
            business.push({...test[key], number:key})
          }
          console.log("this is whole",test);
        }
      return business;
    }))
    .subscribe((business) => {
      for(let bus of business)
      {
        console.log("This is the reviewer name",bus.user.name);
      }
      //console.log("businesssssss",Object.values(business));



      this.revPool = business;
      
      //this.data =Object.values(this.data)[2];
    })
   }
   async autoMan(query:any)
   {
    return (await this.service.autoService(query))
    .pipe(map((res) => {

      const test = Object.values(Object.values(res)[0]);
      const business = [];
      console.log("this is the REVIEW res",res);
      console.log("TYPE OF THIS REVIEW RES",Object.values(Object.values(res)[0])[0]);
      
        for(const key in Object.values(Object.values(res)[0]))
        {
          console.log("this is the REVIEW res key",test[key])
          if(test.hasOwnProperty(key)) {
            business.push({...test[key], number:key})
          }
          console.log("this is whole",test);
        }
      return business;
    }))
    .subscribe((business) => {
      for(let bus of business)
      {
        console.log("Test",bus.title);
      }
      //console.log("businesssssss",Object.values(business));



      this.autoCompleted = business;
      
      //this.data =Object.values(this.data)[2];
    })
   }





}