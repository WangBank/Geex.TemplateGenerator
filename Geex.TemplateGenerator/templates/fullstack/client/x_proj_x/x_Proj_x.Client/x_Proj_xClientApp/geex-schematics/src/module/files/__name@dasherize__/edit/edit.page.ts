import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { deepCopy } from "@delon/util";
import { isEqual } from "lodash-es";

import { MyFormGroup, RoutedComponent } from "../../../shared/components/routed.component.base";
import {
  <%= classify(name) %>ByIdQuery,
  <%= classify(name) %>ByIdQueryVariables,
  <%= classify(name) %>ByIdGql,
  Create<%= classify(name) %>sGql,
  Create<%= classify(name) %>RequestInput,
  Edit<%= classify(name) %>RequestInput,
  Edit<%= classify(name) %>sGql,
  <%= classify(name) %>,
} from "../../../shared/graphql/.generated/type";
import { EditMode } from "../../../shared/types/common";

type EntityEditablePart = Pick<<%= classify(name) %>, "name">;

export type <%= classify(name) %>EditPageParams = {
  name: string;
};

type <%= classify(name) %>EditPageData = {
  id: string;
  entityForm: MyFormGroup<Pick<<%= classify(name) %>, "name">>;
  disabled: boolean;
};

@Component({
  selector: "app-<%= classify(name) %>s-edit",
  templateUrl: "./edit.page.html",
  styles: [],
})
export class <%= classify(name) %>EditPage extends RoutedComponent<<%= classify(name) %>EditPageParams, <%= classify(name) %>EditPageData> {
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
    let result: <%= classify(name) %>EditPageData;
    let fb: FormBuilder = new FormBuilder();

    let formConfig: { [key in keyof EntityEditablePart]: FormControl };
    if (id) {
      let res = await this.apollo
        .query<<%= classify(name) %>ByIdQuery, <%= classify(name) %>ByIdQueryVariables>({
          query: <%= classify(name) %>ByIdGql,
          variables: {
            id: id,
          },
        })
        .toPromise();
      let entity = res.data.<%= camelize(name) %>s.items[0];
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
          mutation: Create<%= classify(name) %>sGql,
          variables: {
            input: {
              name: this.context.entityForm.value.name,
            } as Create<%= classify(name) %>RequestInput,
          },
        })
        .toPromise();
      this.msgSrv.success("添加成功");
      await this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
    } else {
      if (this.mode === "edit") {
        await this.apollo
          .mutate({
            mutation: Edit<%= classify(name) %>sGql,
            variables: {
              input: {
                id: this.context.id,
                name: this.context.entityForm.value.name,
              } as Edit<%= classify(name) %>RequestInput,
            },
          })
          .toPromise();
        this.msgSrv.success("修改成功");
        await this.router.navigate(["../../"], { relativeTo: this.route, replaceUrl: true });

      }
    }
  }

  back() {
    if (this.mode == "edit") {
      this.router.navigate(["../../"], { relativeTo: this.route, replaceUrl: true });
    } else {
      this.router.navigate(["../"], { relativeTo: this.route, replaceUrl: true });
    }
  }
}
