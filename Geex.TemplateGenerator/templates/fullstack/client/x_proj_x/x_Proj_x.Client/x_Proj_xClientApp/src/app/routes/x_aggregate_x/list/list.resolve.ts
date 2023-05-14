import { Injectable, Injector } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { merge } from "lodash";
import { Observable } from "rxjs";

import { x_Aggregate_xListPageParam } from "./list.page";

import { RoutedComponentResolveBase } from "@/app/shared/resolvers/route-component.resolver.base";

@Injectable({
  providedIn: "root",
})
export class x_Aggregate_xListPageResolve extends RoutedComponentResolveBase<x_Aggregate_xListPageParam> {
  constructor(injector: Injector) {
    super(injector);
  }
  completeRouteParams(queryParams: { [x: string]: any }): void {
    queryParams.pi ??= 1;
    queryParams.ps ??= 10;
  }
  routeQueryParamsToParams(params: { [x: string]: any }): x_Aggregate_xListPageParam {
    let buyDate = null;
    if (params.buyDate?.length) {
      buyDate = params.buyDate.split(",").map(x => new Date(x));
    }
    let resolvedParams: x_Aggregate_xListPageParam = {
      pi: params.pi,
      ps: params.ps,
      filterText: params.filterText ?? null,
    };
    return resolvedParams;
  }
}
