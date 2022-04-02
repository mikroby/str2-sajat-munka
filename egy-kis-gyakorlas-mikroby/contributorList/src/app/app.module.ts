import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './common/card/card.component';
import { ListComponent } from './page/list/list.component';
import { DetailsComponent } from './page/details/details.component';
import { DatesorterPipe } from './pipe/datesorter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListComponent,
    DetailsComponent,
    DatesorterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
