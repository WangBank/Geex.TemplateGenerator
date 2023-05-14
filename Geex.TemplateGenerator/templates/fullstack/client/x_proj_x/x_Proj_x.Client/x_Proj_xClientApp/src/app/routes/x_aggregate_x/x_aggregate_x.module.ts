import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared";

import { x_Aggregate_xEditPage } from "./edit/edit.page";
import { x_Aggregate_xListPage } from "./list/list.page";
import { x_Aggregate_xRoutingModule } from "./x_aggregate_x-routing.module";

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, x_Aggregate_xRoutingModule],
  declarations: [x_Aggregate_xListPage, x_Aggregate_xEditPage],
})
export class x_Aggregate_xModule {}
