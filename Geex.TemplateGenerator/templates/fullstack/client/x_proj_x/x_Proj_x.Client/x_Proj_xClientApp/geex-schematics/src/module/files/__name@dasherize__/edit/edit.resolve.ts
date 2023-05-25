import { Injectable, Injector } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { merge } from "lodash";
import { Observable } from "rxjs";

import { RoutedComponentResolveBase } from "../../../shared/resolvers/route-component.resolver.base";
import { <%= classify(aggregateName) %>EditPageParams } from "./edit.page";

@Injectable({
  providedIn: "root",
})
export class <%= classify(aggregateName) %>EditPageResolve extends RoutedComponentResolveBase<<%= classify(aggregateName) %>EditPageParams> {
  override normalizeParams(queryParams: <%= classify(aggregateName) %>EditPageParams): <%= classify(aggregateName) %>EditPageParams {
    let resolvedParams: <%= classify(aggregateName) %>EditPageParams = {
      id: queryParams.id ?? undefined,
      name: queryParams.name ?? undefined,
    };
    return resolvedParams;
  }
  constructor(injector: Injector) {
    super(injector);
  }
}
