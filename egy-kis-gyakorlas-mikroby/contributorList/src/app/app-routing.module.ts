import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './page/list/list.component';
import { DetailsComponent } from './page/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'details/:login',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
