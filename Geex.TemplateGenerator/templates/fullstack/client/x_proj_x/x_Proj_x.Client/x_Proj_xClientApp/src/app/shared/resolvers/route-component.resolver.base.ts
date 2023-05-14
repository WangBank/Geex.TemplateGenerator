import { Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export abstract class RoutedComponentResolveBase<TParams> implements Resolve<TParams> {
  protected router: Router;
  /**
   *
   */
  constructor(protected injector: Injector) {
    this.router = injector.get(Router);
  }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TParams> {
    var [routeParams, queryParams] = [{ ...route.params }, { ...route.queryParams }];
    // 补全路由参数
    await this.completeRouteParams(queryParams);
    // 路由参数转换为组件参数
    let params = this.routeQueryParamsToParams(queryParams);
    const routeParam = Object.values(routeParams);
    let sub = this.router.navigationEnd$?.subscribe(x => {
      setTimeout(() => {
        if (routeParam.length > 0) {
          this.router.virtualNavigate([...routeParam], { queryParams });
        } else {
          this.router.virtualNavigate([], { queryParams });
        }
        sub.unsubscribe();
      });
    });
    return params;
  }
  // 补全路由参数
  abstract completeRouteParams(queryParams: { [x: string]: any }): void | Promise<void>;
  // 路由参数转换为组件参数
  abstract routeQueryParamsToParams(queryParams: { [x: string]: any }): TParams;
  /**根据url字符串返回Boolean类型值 */
  getBooleanValue(value: string): boolean {
    if (value) {
      if (value.toLowerCase() == "true") return true;
      if (value.toLowerCase() == "false") return false;
      return null;
    }
    return null;
  }
}
