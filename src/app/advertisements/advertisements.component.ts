import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Advertisements } from '../data-structures/AdvertisementsPayloadInterface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css'
})
export class AdvertisementsComponent implements OnInit{

  advertisementsUrl = "http://localhost:9091/api/v1/advertisements/movies";
  advertisements!: Advertisements[];


  constructor(private http: HttpClient) {}

  
  ngOnInit(): void {
        this.http.get<Advertisements[]>(this.advertisementsUrl).subscribe(
            (data: Advertisements[]) => {                
                this.advertisements = data;
                console.log(this.advertisements);
            }
        );
  }

}
