import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { isDate } from "lodash-es";
import { combineLatest, forkJoin, zip } from "rxjs";
import { filter, map } from "rxjs/operators";

import { BusinessComponentBase } from "../business.component.base";

import { resolve } from "dns";
// 强类型表单
export interface MyFormGroup<TValue> extends FormGroup {
  controls: {
    [key in keyof TValue]: FormControl;
  };
  value: TValue;
}

/**
 *
 * @class 路由组件基类
 * @extends {BusinessComponentBase}
 * @template TParams 参数对应的表单类型
 * @template TContext 绑定数据上下文类型
 */
@Component({ template: "" })
export abstract class RoutedComponent<TParams extends {}, TContext> extends BusinessComponentBase {
  //组件参数对应的表单, 如果没有对应表单元素, 也需要新增hidden表单项
  params: MyFormGroup<TParams>;
  initialParamsValue: TParams;
  private fb: FormBuilder;
  //绑定数据上下文，所有页面绑定应该都指向此属性
  context: TContext;
  constructor(injector: Injector) {
    super(injector);
    this.fb = injector.get(FormBuilder);
  }
  ngOnInit() {
    combineLatest([this.route.params, this.route.data])
      .pipe(
        map(([pathParams, { params: queryParams }]) => {
          return { ...pathParams, ...queryParams };
        }),
      )
      .subscribe(async params => {
        const reuseItems = this.reuseTabSrv.items.map(x => x.url);
        if (!reuseItems.includes(this.router.url)) {
          await this.prepare(params);
          this.context = await this.fetchData();
          this.sthAfterFetch();
          this.cdr.markForCheck();
        }
      });
  }
  async prepare(resolvedParams: TParams) {
    let group = Object.entries(resolvedParams).map(x => [x[0], [x[1]]]);
    this.initialParamsValue = resolvedParams;
    this.params = this.fb.group(Object.fromEntries(group)) as MyFormGroup<TParams>;
  }
  //刷新
  refresh() {
    let paramsValues = this.params.getRawValue();
    this.router.navigate(this.paramsToPathParam(paramsValues), {
      queryParams: this.paramsToQueryParam(paramsValues),
      forceReload: true,
    });
  }

  //根据组件参数换区数据上下文
  abstract fetchData(): Promise<TContext>;

  //组件参数转路由查询参数
  paramsToQueryParam(params: TParams) {
    // for in (仅取出有值的键值对，用于路由传参)
    let validParams = {};
    for (const key in params) {
      let item = params[key];
      if (Array.isArray(item)) {
        if (item.any()) {
          validParams[key as string] = item
            .map(x => {
              if (isDate(x)) {
                return x.toISOString();
              }
              return x.toString();
            })
            .join(",");
        }
      } else {
        if (item !== undefined || item !== null) {
          validParams[key as string] = item;
        }
      }
    }
    return validParams;
  }

  paramsToPathParam(params: TParams) {
    return [];
  }
  sthAfterFetch() {}
}
