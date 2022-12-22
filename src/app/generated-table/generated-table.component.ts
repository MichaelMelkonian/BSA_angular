import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { Businesses } from '../model/businesses';

@Component({
  selector: 'generated-table',
  templateUrl:'./generated-table.component.html',
  styleUrls: ['./generated-table.component.css']
})
export class GeneratedTableComponent implements OnInit {






  @Output() cardEvent = new EventEmitter<boolean>();
  cardo = true;
  @Input() BUSY?:any | undefined;
  public busCardo: Businesses[] = [];

  @Input() itemNum: number | undefined;
  @Input() imageURL: string | undefined;
  @Input() busName: string | undefined;
  @Input() rating: number | undefined;
  @Input() distance: number | undefined;
  @Input() formGen: boolean | undefined;
  
  public clickTrack: any;
  constructor() { }

  ngOnInit(): void {
    this.clickTrack = false;
  }




  busWindow(x:any)
  {
    //console.log("This is logging this click",x)
    console.log("THIS IS BEFORE THE CLICK",this.formGen);
    this.clickTrack = true;
    this.formGen = false;
    this.cardEvent.emit(x);
    //console.log("THIS IS THE INFO ID FROM THE SELECTED BUSINESS",x);
    
  }



}
