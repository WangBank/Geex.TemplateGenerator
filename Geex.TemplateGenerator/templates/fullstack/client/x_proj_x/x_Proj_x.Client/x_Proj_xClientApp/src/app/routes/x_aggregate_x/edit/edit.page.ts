import { Component, Injector, OnInit } from "@angular/core";
import { SFComponent, SFSchema, SFUISchema } from "@delon/form";
import { deepCopy } from "@delon/util";

import { RoutedComponent } from "../../../shared/components/routed.component.base";
import {
  x_Aggregate_xByIdQuery,
  x_Aggregate_xByIdQueryVariables,
  x_Aggregate_xByIdGql,
  Createx_Aggregate_xsGql,
  Createx_Aggregate_xRequestInput,
  Editx_Aggregate_xRequestInput,
  Editx_Aggregate_xsGql,
} from "../../../shared/graphql/.generated/type";
import { EditMode } from "../../../shared/types/common";

export type x_Aggregate_xEditPageParams = {
  id: string;
  name: string;
};

type x_Aggregate_xEditPageData = {
  disabled: boolean;
};

@Component({
  selector: "app-x-aggregate-x-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.css"],
})
export class x_Aggregate_xEditPage extends RoutedComponent<x_Aggregate_xEditPageParams, x_Aggregate_xEditPageData> {
  mode: EditMode;
  ui: SFUISchema = {
    "*": {
      spanLabelFixed: 100,
    },
  };

  constructor(private injector: Injector) {
    super(injector);
  }

  close() {
    if (this.params.value != this.initialParamsValue) {
      this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
    } else {
      this.nzModalSrv.confirm({
        nzTitle: "当前页面内容未保存，确定离开？",
        nzOnOk: () => {
          // this.router.navigate(["../"], { relativeTo: this.route });
          this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
        },
      });
    }
  }

  async fetchData() {
    let params = this.params.value;
    this.mode = params.id ? "edit" : "create";
    let result: x_Aggregate_xEditPageData;
    if (params.id) {
      let res = await this.apollo
        .query<x_Aggregate_xByIdQuery, x_Aggregate_xByIdQueryVariables>({
          query: x_Aggregate_xByIdGql,
          variables: {
            id: params.id,
          },
        })
        .toPromise();
      let entity = res.data.x_aggregate_xs.items[0];
      result = {
        disabled: false,
      };
    } else {
      result = {
        disabled: false,
      };
    }

    return result;
  }

  async submit(): Promise<void> {
    debugger;
    if (this.mode === "create") {
      await this.apollo
        .mutate({
          mutation: Createx_Aggregate_xsGql,
          variables: {
            input: {
              name: this.params.value.name,
            } as Createx_Aggregate_xRequestInput,
          },
        })
        .toPromise();
    } else {
      if (this.mode === "edit") {
        await this.apollo
          .mutate({
            mutation: Editx_Aggregate_xsGql,
            variables: {
              input: {
                id: this.params.value.id,
                name: this.params.value.name,
              } as Editx_Aggregate_xRequestInput,
            },
          })
          .toPromise();
      }
    }
    this.msgSrv.success("修改成功");
    await this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
  }
}
