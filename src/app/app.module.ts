import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './extra/login/login.component';
import { RegisterComponent } from './Layout/register/register.component';
import { AdminComponent } from './extra/admin/admin.component';
import { Admin2Component } from './Layout/admin2/admin2.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FacebookLoginProvider,SocialLoginModule,SocialAuthServiceConfig} from 'angularx-social-login';
import { AuthInterceptorServiceService } from './shared/service/auth-interceptor.service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogUserComponent } from './shared/dailogs/dialog-user/dialog-user.component';
import { DialogAdduserComponent } from './shared/dailogs/dialog-adduser/dialog-adduser.component';

import {MaterialExampleModule} from '../app/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    Admin2Component,
    DialogUserComponent,
    DialogAdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule
  ],
  providers: [
    {provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1151371408992160'),
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorServiceService,
          multi: true
        },
      //  MatDatepickerModule
      ],
    } as SocialAuthServiceConfig,
}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
