import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { <%= classify(name) %>EditPage } from "./edit/edit.page";
import { <%= classify(name) %>ListPage } from "./list/list.page";
import { <%= classify(name) %>Resolve } from "./list/list.resolve";

const routes: Routes = [
  {
    path: "",
    component: <%= classify(name) %>ListPage,
    resolve: { params: <%= classify(name) %>Resolve },
    runGuardsAndResolvers: "always",
  },
  { path: "edit", component: <%= classify(name) %>EditPage },
  { path: "edit/:name", component: <%= classify(name) %>EditPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class <%= classify(name) %>RoutingModule {}
