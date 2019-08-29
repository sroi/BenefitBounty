import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Output() public sidenavToggle = new EventEmitter();
  counter = 0;
  constructor() {}
  ngOnInit() {}
  
  // public onToggleSidenav = () => {
  //   this.counter = this.counter + 1;
  //   this.sidenavToggle.emit(this.counter);
  // }
}