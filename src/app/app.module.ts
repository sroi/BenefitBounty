import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPrComponent } from './admin-pr/admin-pr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginCompComponent } from './login-comp/login-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPrComponent,
    LoginCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
