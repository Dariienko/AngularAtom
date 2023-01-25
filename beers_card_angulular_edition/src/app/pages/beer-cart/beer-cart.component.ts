import { Component, OnInit } from '@angular/core';
import {BeerServiceService} from "../../services/beer.service.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-beer-cart',
  templateUrl: './beer-cart.component.html',
  styleUrls: ['./beer-cart.component.scss']
})
export class BeerCartComponent implements OnInit {
  constructor( private beerService: BeerServiceService) {

  }
  beerCart$ = this.beerService.cartStorage$;
  ngOnInit(): void {

  }
}
