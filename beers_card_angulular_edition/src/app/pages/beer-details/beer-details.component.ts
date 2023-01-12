import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BeerServiceService } from 'src/app/services/beer.service.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {

  id!: string;
  details: any;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.beerService.getBeerById(this.id).subscribe(details => this.details = details[0])
  }
}
