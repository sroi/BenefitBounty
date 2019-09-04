import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project/index';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import{MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
 MatCardModule,
 MatButtonModule,
 MatMenuModule,
 MatIconModule,
 FormsModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
