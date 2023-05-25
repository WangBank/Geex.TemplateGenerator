import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { <%= classify(aggregateName) %>EditPage } from "./edit/edit.page";
import { <%= classify(aggregateName) %>ListPage } from "./list/list.page";
import { <%= classify(aggregateName) %>ListPageResolve } from "./list/list.resolve";
import { <%= classify(aggregateName) %>EditPageResolve } from "./edit/edit.resolve";

const routes: Routes = [
  {
    path: "",
    component: <%= classify(aggregateName) %>ListPage,
    resolve: { params: <%= classify(aggregateName) %>ListPageResolve },
    runGuardsAndResolvers: "always",
  },
  {
    path: "edit",
    component: <%= classify(aggregateName) %>EditPage,
    resolve: { params: <%= classify(aggregateName) %>EditPageResolve },
    runGuardsAndResolvers: "always",
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= classify(name) %>RoutingModule {}
