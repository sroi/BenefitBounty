import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  image: any;
  constructor(public dialogRef: MatDialogRef<PhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.image = data;
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
