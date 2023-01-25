import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BeerCartComponent} from "../pages/beer-cart/beer-cart.component";

@Injectable({
  providedIn: 'root'
})
export class BeerServiceService {

  cartAmount$ = new BehaviorSubject<number>(+(localStorage.getItem('cartAmount') || 0));
  cartStorage$ = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('cartStorage') || ''));
  readonly rootUrl = 'https://api.punkapi.com/v2/';

  constructor(
    private http: HttpClient
  ) {
    this.cartAmount$.subscribe(amount => localStorage.setItem('cartAmount', '' + amount));
    this.cartStorage$.subscribe(amount => localStorage.setItem('cartStorage',JSON.stringify(amount)));
  }

  getBeers(): Observable<any[]>{
    return this.http.get<any[]>(this.rootUrl + "beers");
  }

  getBeerById(id: string){
    return this.http.get<any>(this.rootUrl + "beers/" + id);
  }
  addToCart(beer:any[]){
    const currentAmount = this.cartAmount$.value;
    this.cartAmount$.next(currentAmount + 1);
    const currentStorage = this.cartStorage$.value;
    currentStorage.push(beer);
    this.cartStorage$.next(currentStorage);
  }
  clearCart() {
    this.cartAmount$.next(0);
    this.cartStorage$.next([]);
  }
}
