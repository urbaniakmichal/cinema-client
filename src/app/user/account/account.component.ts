import { Component, OnInit } from "@angular/core";
import { TabMenuModule } from "primeng/tabmenu";
import { MenuItem } from "primeng/api";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-my-account",
  standalone: true,
  imports: [
    TabMenuModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: "./account.component.html",
  styleUrl: "./account.component.scss"
})
export class AccountComponent implements OnInit {

  items!: MenuItem[];


  ngOnInit() {
    this.items = [
      { label: "Profile", routerLink: ['./profile']  },
      { label: "Tickets", routerLink: ['./tickets']  }

    ];
  }
}
