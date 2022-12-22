import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComp} from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneratedTableComponent } from './generated-table/generated-table.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ReserveModalComponent } from './reserve-modal/reserve-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatIconModule} from '@angular/material/icon'; 




@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FormComponentComponent,
    routingComp,
    GeneratedTableComponent,
    BusinessCardComponent,
    ReserveModalComponent


  ],
 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    GoogleMapsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
