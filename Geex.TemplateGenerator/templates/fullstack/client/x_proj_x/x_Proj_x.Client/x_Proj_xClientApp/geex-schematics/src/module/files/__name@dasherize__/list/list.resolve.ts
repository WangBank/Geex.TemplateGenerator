import { RoutedComponentResolveBase } from "@/app/shared/resolvers/route-component.resolver.base";
import { Injectable, Injector } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { merge } from "lodash";
import { Observable } from "rxjs";

import { <%= classify(name) %>ListPageParam } from "./list.page";

@Injectable({
  providedIn: "root",
})
export class <%= classify(name) %>ListPageResolve extends RoutedComponentResolveBase<<%= classify(name) %>ListPageParam> {
  constructor(injector: Injector) {
    super(injector);
  }
  completeRouteParams(queryParams: { [x: string]: any }): void {
    queryParams.pi ??= 1;
    queryParams.ps ??= 10;
  }
  routeQueryParamsToParams(params: { [x: string]: any }): <%= classify(name) %>ListPageParam {
    let buyDate = null;
    if (params.buyDate?.length) {
      buyDate = params.buyDate.split(",").map(x => new Date(x));
    }
    let resolvedParams: <%= classify(name) %>ListPageParam = {
      pi: params.pi,
      ps: params.ps,
      filterText: params.filterText ?? null,
    };
    return resolvedParams;
  }
}
