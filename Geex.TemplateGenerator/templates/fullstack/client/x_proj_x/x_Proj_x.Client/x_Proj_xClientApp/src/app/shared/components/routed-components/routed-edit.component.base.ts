import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { gql } from "apollo-angular";
import { isDate, isEqual } from "lodash-es";
import { combineLatest, forkJoin, from, zip } from "rxjs";
import { filter, map } from "rxjs/operators";

import { EditMode } from "../../types/common";
import { MyFormGroup, RoutedComponent } from "./routed.component.base";

type PropValueType<T, K extends keyof T> = T[K];

type FormControlPropMap<X, T extends [keyof X]> = {
  [K in T[number]]?: FormControl<PropValueType<{ [P in K]?: X[T[number]] }, K>> | PropValueType<{ [P in K]?: X[T[number]] }, K>;
};

// type test = FormControlPropMap<{ id: string; name: string }, ["id"]>;

/**数据上下文 */
export class EditDataContext<T extends { id?: string }, TEditable extends [keyof T]> {
  id: string;
  entityForm: MyFormGroup<FormControlPropMap<T, TEditable>>;
  originalValue: Partial<T>;
}

/**
 *
 * @class 路由组件基类
 * @extends {BusinessComponentBase}
 * @template TParams 参数对应的表单类型
 * @template TContext 绑定数据上下文类型
 */
@Component({ template: "" })
export abstract class RoutedEditComponent<
  TParams extends {},
  TDto extends { id?: string },
  TEditable extends [keyof TDto], // 设置默认类型参数
> extends RoutedComponent<TParams, EditDataContext<TDto, TEditable>> {
  mode: EditMode;

  constructor(private injector: Injector) {
    super(injector);
  }

  close() {
    if (isEqual(this.context.entityForm.value, this.context.originalValue)) {
      this.back();
    } else {
      this.nzModalSrv.confirm({
        nzTitle: "当前页面内容未保存，确定离开？",
        nzOnOk: () => {
          this.back();
        },
      });
    }
  }

  async back() {
    await this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
  }
}
