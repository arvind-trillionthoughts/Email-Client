import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';
import { SinginComponent } from './singin/singin.component';

const routes: Routes = [
  { path: '', component: SinginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signout', component: SignoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
