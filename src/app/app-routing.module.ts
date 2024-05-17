import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SipCalculatorComponent } from './sip-calculator/sip-calculator.component';

const routes: Routes = [
  {path: 'sip', component: SipCalculatorComponent},
  {path: '', redirectTo:'/sip', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
