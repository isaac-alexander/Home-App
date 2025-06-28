import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { db } from '../../../db';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent], 
  template: `
    <section>
      <form>
         <!-- <input type="text" placeholder="Filter by City" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button> -->
        <input 
          type="text" 
          placeholder="Filter by City" 
          [(ngModel)]="searchText"
          (ngModelChange)="filterResults(searchText)"
          name="search" /> 
      </form>
    </section>

    <section class="results">
      <app-housing-location 
        *ngFor="let housingLocation of filteredLocationList" 
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = db;
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  searchText: string = '';

  constructor() {
     // this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    //   this.housingLocationList = housingLocationList;
    //   this.filteredLocationList = housingLocationList;
    // });
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text.trim()) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        location => location.city.toLowerCase().includes(text.toLowerCase().trim())
      );
    }
  }
}
