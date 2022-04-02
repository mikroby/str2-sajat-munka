import { Config } from 'src/app/model/config';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Contributor } from 'src/app/model/contributor';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() contributor!: Contributor
  @Input() index!: number

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) { }

  ngOnInit(): void {
  }

  showDetails(login: string): void {
    Config.scrollPosition = this.viewportScroller.getScrollPosition()
    this.router.navigate(['/', 'details', login])
    Config.scrollToPrevious = true
  }

}
