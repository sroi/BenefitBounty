import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <h1 class="title">Home Page!</h1>
  `,
  styles: [
    //   `.hero {
    // //   background-image: url('/assets/img/canyon.jpg') !important;
    //   background-size: cover;
    //   background-position: center center;
    // }`
    ]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}