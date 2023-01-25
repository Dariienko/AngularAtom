import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {BeerServiceService} from "../../../services/beer.service.service";

@Component({
  templateUrl: `beer-card.component.html`,
  selector: 'app-beer-card',
  styleUrls: ['beer-card.component.scss'],
  preserveWhitespaces: true
})
export class BeerCardComponent {
  @Input() beer: any;
  @Output() deleteMe = new EventEmitter();


  constructor(private beerService: BeerServiceService) {}



  onAddToCartClick() {
    this.beerService.addToCart(this.beer);
  }

  onImageClick() {
    this.deleteMe.emit(this.beer.id);
  }
}
