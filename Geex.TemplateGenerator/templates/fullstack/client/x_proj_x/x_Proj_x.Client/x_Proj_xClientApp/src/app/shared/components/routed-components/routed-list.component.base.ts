import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { gql } from "apollo-angular";
import { isDate } from "lodash-es";
import { combineLatest, forkJoin, zip } from "rxjs";
import { filter, map } from "rxjs/operators";

import { AuditStatus, Role } from "../../graphql/.generated/type";
import { EditDataContext, RoutedEditComponent } from "./routed-edit.component.base";
import { RoutedComponent } from "./routed.component.base";

export class Test extends RoutedEditComponent<{}, Role, ["name"]> {
  async fetchData(): Promise<EditDataContext<Role, ["name"]>> {
    let entity = {} as Role;
    return {
      id: entity.id,
      originalValue: { name: "233" },
      entityForm: new FormBuilder().group({
        name: "233",
      }),
    };
  }
}

export type BatchOperationName = "delete" | "audit" | "submit" | "unaudit" | "unsubmit";

/**数据上下文 */
export class ListDataContext<T extends { id?: string }> {
  data: Array<Partial<T>>;
  total?: number;
}
type ListDataContextFactory<TDto extends { id?: string }> = (dto: TDto) => ListDataContext<TDto>;

type InferListDataContext<TDto> = ReturnType<ListDataContextFactory<TDto>>;

/**
 *
 * @class 路由组件基类
 * @extends {BusinessComponentBase}
 * @template TParams 参数对应的表单类型
 * @template TContext 绑定数据上下文类型
 */
@Component({ template: "" })
export abstract class RoutedListComponent<
  TParams extends {},
  TDto extends { id?: string },
  TContext extends InferListDataContext<TDto> = InferListDataContext<TDto>, // 设置默认类型参数
> extends RoutedComponent<TParams, TContext> {
  selectedData: Array<Partial<TDto>> = [];

  public get allSelected() {
    return this.selectedData.length > 0 && this.context?.data?.length == this.selectedData.length;
  }

  // 全选 checkbox 状态改变
  onAllChecked(value: boolean): void {
    this.selectedData = value ? this.context.data : [];
  }

  // tr/td checkbox的勾选状态改变
  onItemChecked(data: Partial<TDto>, checked: boolean): void {
    if (checked) {
      this.selectedData.push(data);
    } else {
      this.selectedData = this.selectedData.filter(x => x.id !== data.id);
    }
  }

  batchOperation(sth: BatchOperationName, entityType: string, remark?: string) {
    return new Promise((resolve, reject) => {
      let ids = this.selectedData.map(x => x["id"]);
      let text = "";
      switch (sth) {
        case "delete":
        case "submit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Default).map(x => x["id"]);
          text = "只能操作未上报状态的数据";
          break;
        case "audit":
        case "unsubmit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Submitted).map(x => x["id"]);
          text = "只能操作已上报状态的数据";
          break;
        case "unaudit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Audited).map(x => x["id"]);
          text = "只能操作已审核状态的数据";
          break;
        default:
          break;
      }
      if (ids.length !== this.selectedData.length) {
        return this.msgSrv.warning(text);
      }
      if (!ids.any()) {
        this.msgSrv.warning("至少选择一项");
        return;
      }

      let apiName = `
      mutation ${sth}${entityType}($ids: [String], $remark:String) {
        ${sth}${entityType}(ids: $ids, remark:$remark)
      }
      `;
      if (sth === "delete") {
        apiName = `
          mutation ${sth}${entityType}($ids: [String]) {
            ${sth}${entityType}(input: { ids: $ids })
          }
        `;
      }

      let alertMessage = this.I18N.Common.action.get(sth);
      this.nzModalSrv.confirm({
        nzTitle: `确认${alertMessage}吗？`,
        nzOnOk: async () => {
          await this.apollo
            .mutate({
              mutation: apiName as any,
              variables: {
                remark,
                ids,
              },
            })
            .toPromise();
          resolve(true);
          this.msgSrv.success(this.I18N.Common.message.get(sth));
        },
      });
    });
  }
}
