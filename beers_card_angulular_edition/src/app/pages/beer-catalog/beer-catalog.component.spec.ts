import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCatalogComponent } from './beer-catalog.component';

describe('BeerCatalogComponent', () => {
  let component: BeerCatalogComponent;
  let fixture: ComponentFixture<BeerCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
