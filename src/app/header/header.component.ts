import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../config/auth/auth.service";
import { headerMenuItem } from "../config/mocks/Mocks";
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

  protected readonly headerMenuItem: HeaderMenuItem[] = headerMenuItem;
  protected dropdownOpen: boolean = false;

  constructor(
    protected authService: AuthService
  ) {
  }


  protected openDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
