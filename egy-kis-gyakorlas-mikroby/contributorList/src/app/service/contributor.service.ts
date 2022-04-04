import { Contributor } from '../model/contributor';
import { Repo } from '../model/repo';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'repos/angular/angular/contributors'
  preFix: string = 'users/'
  postFix: string = '/repos'

  // https://api.github.com/repos/angular/angular/contributors?per_page=100
  // https://api.github.com/users/cherryApp/repos

  constructor(
    private http: HttpClient,
  ) { }

  getPage(page: number, perPage: number): Observable<Contributor[]> {
    return this.http.get<Contributor[]>
      (`${this.apiUrl}${this.entityName}?page=${page}&per_page=${perPage}`)
  }

  getOne(name: string): Observable<Repo[]> {
    return this.http.get<Repo[]>
      (`${this.apiUrl}${this.preFix}${name}${this.postFix}?per_page=100`)
  }

}