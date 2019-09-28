import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';

@Component({
  selector: 'app-stakeholder-project-detail',
  templateUrl: './stakeholder-project-detail.component.html',
  styleUrls: ['./stakeholder-project-detail.component.scss']
})
export class StakeholderProjectDetailComponent implements OnInit {
  projectId: string;
  project: any;
  constructor(private route: ActivatedRoute, private stakeHolderService: StakeHolderService) {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.project = this.stakeHolderService.getProject(this.projectId);
    });
   }

  ngOnInit() {
  }

}
