import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderMenuItem } from "../data-structures/objects/HeaderMenuItem";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss"
})
export class HeaderComponent {

  dropdownOpen: boolean = false;


  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  headerMenuItem: HeaderMenuItem[] = [
    {
      name: "Repertuar"
    },
    {
      name: "Cennik"
    },
    {
      name: "Wydarzenia"
    },
    {
      name: "Promocje"
    }
  ];


}
