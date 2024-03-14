import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RepertoireService } from "./repertoire.service";

@Component({
  selector: "app-repertoire",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: "./repertoire.component.html",
  styleUrl: "./repertoire.component.scss"
})
export class RepertoireComponent {

  constructor(
    protected repertoireService: RepertoireService
  ) {
  }

}
