import { Injectable, Injector } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { merge } from "lodash";
import { Observable } from "rxjs";

import { <%= classify(aggregateName) %>ListPageParam } from "./list.page";

import { RoutedComponentResolveBase } from "@/app/shared/resolvers/route-component.resolver.base";

@Injectable({
  providedIn: "root",
})
export class <%= classify(aggregateName) %>ListPageResolve extends RoutedComponentResolveBase<<%= classify(aggregateName) %>ListPageParam> {
  constructor(injector: Injector) {
    super(injector);
  }
  override normalizeParams(params: <%= classify(aggregateName) %>ListPageParam): <%= classify(aggregateName) %>ListPageParam {
    params.pi ??= 1;
    params.ps ??= 10;
    params.filterText ??= "";
    params.sort ??= undefined;
    return params;
  }
}
