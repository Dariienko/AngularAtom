import { Component, OnInit } from '@angular/core';
import { BeerServiceService } from 'src/app/services/beer.service.service';
import {BeerCartComponent} from "../beer-cart/beer-cart.component";

@Component({
  selector: 'app-beer-catalog',
  templateUrl: './beer-catalog.component.html',
  styleUrls: ['./beer-catalog.component.scss']
})
export class BeerCatalogComponent implements OnInit {

  constructor(
    private beerService: BeerServiceService,
  ) {
  }

  beers: any[] = [];

  ngOnInit(): void {
    this.beerService.getBeers().subscribe(beers => this.beers = beers);
  }

  onBeerDeletion(beerId: number) {
    this.beers = this.beers.filter(beer => beer.id !== beerId);
  }
}
