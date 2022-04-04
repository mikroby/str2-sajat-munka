import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Config } from 'src/app/model/config';
import { Repo } from 'src/app/model/repo';
import { ContributorService } from 'src/app/service/contributor.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  repositorys$: Observable<Repo[]> = this.activatedRoute.params.pipe(
    switchMap(params => this.contributorService.getOne(params['login'])),
  )

  constructor(
    private contributorService: ContributorService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private viewportScroller: ViewportScroller,
  ) { }

  ngOnInit(): void {
  }
  
  backToPrevPage():void{    
    this.router.navigate(['/'])
  }

  scrollDown(): void {
    Config.scrollToPrevious = false
    this.viewportScroller.scrollToAnchor('bottom')
  }
  
  scrollUp(): void {
    Config.scrollToPrevious = false
    this.viewportScroller.scrollToPosition([0, 0])
  }
  
}
