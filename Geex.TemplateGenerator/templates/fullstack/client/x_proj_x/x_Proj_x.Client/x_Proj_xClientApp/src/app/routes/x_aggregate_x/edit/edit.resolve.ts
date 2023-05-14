import { Injectable, Injector } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { merge } from "lodash";
import { Observable } from "rxjs";

import { RoutedComponentResolveBase } from "../../../shared/resolvers/route-component.resolver.base";
import { x_Aggregate_xEditPageParams } from "./edit.page";

@Injectable({
  providedIn: "root",
})
export class x_Aggregate_xEditPageResolve extends RoutedComponentResolveBase<x_Aggregate_xEditPageParams> {
  completeRouteParams(queryParams: { [x: string]: any }): void | Promise<void> {
    return;
  }
  routeQueryParamsToParams(queryParams: { [x: string]: any }): x_Aggregate_xEditPageParams {
    let resolvedParams: x_Aggregate_xEditPageParams = {
      id: queryParams.id ?? undefined,
      name: queryParams.name ?? undefined,
    };
    return resolvedParams;
  }
  constructor(injector: Injector) {
    super(injector);
  }
}
