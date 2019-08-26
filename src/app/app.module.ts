import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPrComponent } from './admin-pr/admin-pr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component:LoginCompComponent }
 
];

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
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ) 
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
