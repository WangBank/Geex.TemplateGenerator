import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";

import { deepCopy } from "@delon/util";
import { isEqual } from "lodash-es";

import { MyFormGroup, RoutedComponent } from "../../../shared/components/routed.component.base";
import {
  x_Aggregate_xByIdQuery,
  x_Aggregate_xByIdQueryVariables,
  x_Aggregate_xByIdGql,
  Createx_Aggregate_xsGql,
  Createx_Aggregate_xRequestInput,
  Editx_Aggregate_xRequestInput,
  Editx_Aggregate_xsGql,
  x_Aggregate_x,
} from "../../../shared/graphql/.generated/type";
import { EditMode } from "../../../shared/types/common";

type EntityEditablePart = Pick<x_Aggregate_x, "name">;

export type x_Aggregate_xEditPageParams = {
  name: string;
};

type x_Aggregate_xEditPageData = {
  id: string;
  entityForm: MyFormGroup<Pick<x_Aggregate_x, "name">>;
  disabled: boolean;
};

@Component({
  selector: "app-x_Aggregate_xs-edit",
  templateUrl: "./edit.page.html",
  styles: [],
})
export class x_Aggregate_xEditPage extends RoutedComponent<x_Aggregate_xEditPageParams, x_Aggregate_xEditPageData> {
  mode: EditMode;


  constructor(private injector: Injector) {
    super(injector);
  }

  close() {
    if (isEqual(this.context.entityForm.value, this.initialParamsValue)) {
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

  async fetchData() {
    //let params = this.params.value;
    const id = this.route.snapshot.params.id;
    this.mode = id ? "edit" : "create";
    let result: x_Aggregate_xEditPageData;
    let fb: FormBuilder = new FormBuilder();

    let formConfig: { [key in keyof EntityEditablePart]: FormControl };
    if (id) {
      let res = await this.apollo
        .query<x_Aggregate_xByIdQuery, x_Aggregate_xByIdQueryVariables>({
          query: x_Aggregate_xByIdGql,
          variables: {
            id: id,
          },
        })
        .toPromise();
      let entity = res.data.x_aggregate_xs.items[0];
      formConfig = { name: new FormControl(entity.name) };
    } else {
      formConfig = { name: new FormControl("") };
    }
    result = {
      id,
      entityForm: fb.group(formConfig) as MyFormGroup<EntityEditablePart>,
      disabled: false,
    };
    this.initialParamsValue = result.entityForm.value;
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
              name: this.context.entityForm.value.name,
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
                id: this.context.id,
                name: this.context.entityForm.value.name,
              } as Editx_Aggregate_xRequestInput,
            },
          })
          .toPromise();
      }
    }
    this.msgSrv.success("修改成功");
    await this.router.navigate(["../../"], { relativeTo: this.route, replaceUrl: true });
  }

  back() {
    if (this.mode == "edit") {
      this.router.navigate(["../../"], { relativeTo: this.route, replaceUrl: true });
    } else {
      this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
    }
  }
}
