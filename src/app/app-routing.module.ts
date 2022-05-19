import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin2Component } from './Layout/admin2/admin2.component';
import { RegisterComponent } from './Layout/register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'home', component: Admin2Component }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
