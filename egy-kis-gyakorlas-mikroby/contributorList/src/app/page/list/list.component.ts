import { Contributor } from './../../model/contributor';
import { ContributorService } from './../../service/contributor.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/app/model/config';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewChecked {

  page: number = Config.page
  perPage: number = Config.perPage

  from!: number
  to!: number

  list$!: Observable<Contributor[]>

  constructor(
    private contributorService: ContributorService,
    private viewportScroller: ViewportScroller,
  ) { }


  ngOnInit(): void {
    this.list$ = this.contributorService.getPage(Config.page, Config.perPage)
    this.from = ((Config.page - 1) * Config.perPage) + 1
    this.to = Config.page * Config.perPage
  }

  ngAfterViewChecked(): void {    
    if(Config.scrollToPrevious){
      this.viewportScroller.scrollToPosition(Config.scrollPosition)
    }
  }

  previousPage(): void {
    if (Config.page === 1) { return }
    --Config.page
    this.ngOnInit()
  }

  nextPage(): void {
    ++Config.page
    this.ngOnInit()
  }

  onChange(): void {
    Config.perPage = this.perPage
    this.ngOnInit()
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
