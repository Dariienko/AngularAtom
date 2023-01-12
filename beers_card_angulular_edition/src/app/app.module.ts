import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BeerDetailsComponent } from './pages/beer-details/beer-details.component'
import { Route, RouterModule, Routes } from '@angular/router';
import { BeerCatalogComponent } from './pages/beer-catalog/beer-catalog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', component: BeerCatalogComponent },
  { path: 'catalog/:id', component: BeerDetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BeerDetailsComponent,
    BeerCatalogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
