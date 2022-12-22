import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'bookings', component: MyBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComp = [SearchComponent, MyBookingsComponent]