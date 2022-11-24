import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private http: HttpClient ){}

  beers: any[] = [];

  ngOnInit(): void {
    this.http.get<any>('https://api.punkapi.com/v2/beers').subscribe(
      (result) => this.beers = result
    );
  }
}
