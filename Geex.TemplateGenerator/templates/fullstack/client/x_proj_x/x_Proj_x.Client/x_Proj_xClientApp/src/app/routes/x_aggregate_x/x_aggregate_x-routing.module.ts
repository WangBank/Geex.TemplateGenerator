import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { x_Aggregate_xEditPage } from "./edit/edit.page";
import { x_Aggregate_xEditPageResolve } from "./edit/edit.resolve";
import { x_Aggregate_xListPage } from "./list/list.page";
import { x_Aggregate_xListPageResolve } from "./list/list.resolve";

const routes: Routes = [
  {
    path: "",
    component: x_Aggregate_xListPage,
    resolve: { params: x_Aggregate_xListPageResolve },
    runGuardsAndResolvers: "always",
  },
  { path: "edit", component: x_Aggregate_xEditPage, resolve: { params: x_Aggregate_xEditPageResolve }, runGuardsAndResolvers: "always" },
  {
    path: "edit/:name",
    component: x_Aggregate_xEditPage,
    resolve: { params: x_Aggregate_xEditPageResolve },
    runGuardsAndResolvers: "always",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class x_Aggregate_xRoutingModule {}
