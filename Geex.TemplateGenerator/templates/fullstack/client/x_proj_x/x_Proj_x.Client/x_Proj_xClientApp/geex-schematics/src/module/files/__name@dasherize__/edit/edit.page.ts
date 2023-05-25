import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { deepCopy } from "@delon/util";
import { isEqual } from "lodash-es";

import { EditDataContext, RoutedEditComponent } from "../../../shared/components/routed-components/routed-edit.component.base";
import {
  <%= classify(aggregateName) %>ByIdQuery,
  <%= classify(aggregateName) %>ByIdQueryVariables,
  <%= classify(aggregateName) %>ByIdGql,
  Create<%= classify(aggregateName) %>sGql,
  Create<%= classify(aggregateName) %>Input,
  Edit<%= classify(aggregateName) %>Input,
  Edit<%= classify(aggregateName) %>sGql,
  <%= classify(aggregateName) %>,
} from "../../../shared/graphql/.generated/type";
import { EditMode } from "../../../shared/types/common";

type EntityEditablePart = Pick<<%= classify(aggregateName) %>, "name">;

export type <%= classify(aggregateName) %>EditPageParams = {
  id: string;
  name: string;
};
type <%= classify(aggregateName) %>EditPageContext = EditDataContext<<%= classify(aggregateName) %>, "name"> & {
  disabled: boolean;
};

@Component({
  selector: "app-<%= dasherize(aggregateName) %>-edit",
  templateUrl: "./edit.page.html",
  styles: [],
})
export class <%= classify(aggregateName) %>EditPage extends RoutedEditComponent<<%= classify(aggregateName) %>EditPageParams, <%= classify(aggregateName) %>, "name"> {
  mode: EditMode;
  context: <%= classify(aggregateName) %>EditPageContext;

  constructor(injector: Injector) {
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

  async fetchData() {
    let params = this.params.value;
    const id = params.id;
    this.mode = id ? "edit" : "create";
    let result: <%= classify(aggregateName) %>EditPageContext={
      id,
      disabled: false,
    }
    let fb: FormBuilder = new FormBuilder();

    let formConfig: { [key in keyof EntityEditablePart]: FormControl };
    if (id) {
      let res = await this.apollo
        .query<<%= classify(aggregateName) %>ByIdQuery, <%= classify(aggregateName) %>ByIdQueryVariables>({
          query: <%= classify(aggregateName) %>ByIdGql,
          variables: {
            id: id,
          },
        })
        .toPromise();
      let entity = res.data.<%= camelize(aggregateName) %>ById;
      result.entity = entity;
      formConfig = { name: new FormControl(entity.name) };
    } else {
      formConfig = { name: new FormControl("") };
    }
    let entityForm = fb.group(formConfig);
    result.entityForm = entityForm;
    result.originalValue = entityForm.value;
    return result;
  }

  async submit(): Promise<void> {
    if (this.mode === "create") {
      await this.apollo
        .mutate({
          mutation: Create<%= classify(aggregateName) %>sGql,
          variables: {
            input: {
              name: this.context.entityForm.value.name,
            } as Create<%= classify(aggregateName) %>Input,
          },
        })
        .toPromise();
      this.msgSrv.success("添加成功");
      await this.back(true);
    } else {
      if (this.mode === "edit") {
        await this.apollo
          .mutate({
            mutation: Edit<%= classify(aggregateName) %>sGql,
            variables: {
              id: this.context.id,
              input: {
                name: this.context.entityForm.value.name,
              } as Edit<%= classify(aggregateName) %>Input,
            },
          })
          .toPromise();
        this.msgSrv.success("修改成功");
        await this.back(true);
      }
    }
  }
}
