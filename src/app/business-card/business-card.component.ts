import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { ReserveModalComponent } from '../reserve-modal/reserve-modal.component';

//import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  @Output() retrace = new EventEmitter<boolean>();
  @Input() bussClick?:any | undefined;
  @Input() secondBus?: any;
  @Input() reviewerz?: any;
  busValue = true;

  public data: any;
  public busName: any;
  
  constructor(private dialogRef: MatDialog) { }

  ngOnInit() {
 
    console.log(this.data)

  }


  getBusID(x:any)
  {
    this.data =x;
    console.log("This is the id of the bus card",x);
    
  }

  openModal(x:any)
  {
   
    this.dialogRef.open(ReserveModalComponent,
      {
        data: {
          name:x
        }
      });

  }

  retraceFunc()
  {
    this.retrace.emit(this.busValue);
  }
 
}
