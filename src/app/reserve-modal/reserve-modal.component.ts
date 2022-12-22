import { Component, OnInit , Inject, KeyValueDiffers} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class EM implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'reserve-modal',
  templateUrl: './reserve-modal.component.html',
  styleUrls: ['./reserve-modal.component.css']
})
export class ReserveModalComponent  implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  dateFormControl = new FormControl('',[Validators.required]);
  timeFormControl = new FormControl('', [Validators.required]);
  matcher = new EM();
  //constructor(private dialogRef: MatDialog) { }

  busyName;
  constructor(@Inject(MAT_DIALOG_DATA)public data, private dialogRef: MatDialog) {
    this.busyName = data.name;
  }
  ngOnInit() {
    this.reserveCheck();
  }

  public checkReserve;
  public reserveData = {};
  public reservArrayz: Array<Object>;

  closeModal()
  {
    this.dialogRef.closeAll();
  }
 
  collectVariables(x:any,y:any,z: any)
  {
    console.log(x);
    console.log(y);
    console.log(z);
  }

  saveToLocal(y:any,z: any,email:any,date:any,bussinessName: any)
  {
   
    console.log("Email",email)
    console.log("Date",date)
    console.log((y.viewModel).toString());
    console.log(z.viewModel.toString());
    let time = (y.viewModel).toString() + " : "+ (z.viewModel).toString();
    this.reserveData = {
      Email: email,
      Date: date,
      Time: time,
      Name: bussinessName

    }

    
    localStorage.setItem(bussinessName,JSON.stringify(this.reserveData));
    this.reserveCheck();
    alert("Reservation Created!");

  }
  getFromLocal()
  {
    let data = localStorage.getItem('session');
  }
  reserveCheck()
  {
    if(localStorage.getItem(this.busyName) !== undefined)
    {

      this.checkReserve = true;
    }
    else
    {
      this.checkReserve = false;
    }
  }

}
