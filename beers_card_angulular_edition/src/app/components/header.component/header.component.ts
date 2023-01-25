import { Component, OnInit } from '@angular/core';
import {BeerServiceService} from "../../services/beer.service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  cartSize$ = this.beerService.cartAmount$;

  constructor(
    private beerService: BeerServiceService
  ) {

  }

  ngOnInit() {

  }

  onClearClick() {
    this.beerService.clearCart();
  }
}
