import { Component } from '@angular/core';
import { CommonService } from './shared/common.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SROIBenefitBounty';
  role: string = null;
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
  constructor(private commonService: CommonService,private router:Router) {}
  ngOnInit() {
    // if(this.role===null)
    // {
    //   this.router.navigate(['login']);

    // }
    this.commonService.roleChanged.subscribe(role=> {
      this.role = role;
    })
    
    
  }
  
}
