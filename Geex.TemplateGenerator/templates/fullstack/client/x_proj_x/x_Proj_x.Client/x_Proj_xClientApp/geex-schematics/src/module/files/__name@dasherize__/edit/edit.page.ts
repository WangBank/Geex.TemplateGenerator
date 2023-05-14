import { Component, Injector, OnInit } from "@angular/core";
import { SFComponent, SFSchema, SFUISchema } from "@delon/form";
import { deepCopy } from "@delon/util";

import { RoutedComponent } from "../../../shared/components/routed.component.base";
import {
  <%= classify(name) %>ByIdQuery,
  <%= classify(name) %>ByIdQueryVariables,
  <%= classify(name) %>ByIdGql,
  Create<%= classify(name) %>sGql,
  Create<%= classify(name) %>RequestInput,
} from "../../../shared/graphql/.generated/type";
import { EditMode } from "../../../shared/types/common";

export type <%= classify(name) %>EditPageParams = {
  id: string;
  // name: string;
};

type <%= classify(name) %>EditPageData = {
  disabled: boolean;
};


@Component({
  selector: '<%= selector %>-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.<%= styleext %>']
})
export class <%= classify(name) %>EditPage extends RoutedComponent<<%= classify(name) %>EditPageParams, <%= classify(name) %>EditPageData>  {
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
    if (this.params.dirty) {
      this.router.navigate(["/identity/<%= camelize(name) %>"], { relativeTo: this.route, replaceUrl: true });
    } else {
      this.nzModalSrv.confirm({
        nzTitle: "当前页面内容未保存，确定离开？",
        nzOnOk: () => {
          // this.router.navigate(["/identity/<%= camelize(name) %>"], { relativeTo: this.route });
          this.router.navigate(["/identity/<%= camelize(name) %>"], { relativeTo: this.route, replaceUrl: true });
        },
      });
    }
  }

  async fetchData() {
    let params = this.params.value;
    this.mode = params.id ? "edit" : "create";
    let result: <%= classify(name) %>EditPageData;
    if (params.id) {
      let res = await this.apollo
        .query<<%= classify(name) %>ByIdQuery, <%= classify(name) %>ByIdQueryVariables>({
          query: <%= classify(name) %>ByIdGql,
          variables: {
            id: params.id,
          },
        })
        .toPromise();
      let entity = res.data.<%= camelize(name) %>s.items[0];
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
    if (this.mode === "create") {
      await this.apollo
        .mutate({
          mutation: Create<%= classify(name) %>sGql,
          variables: {
            input: {
              // name: this.params.value.name,
            } as Create<%= classify(name) %>RequestInput,
          },
        })
        .toPromise();
    }
    this.msgSrv.success("修改成功");
    // await this.router.navigate(["/identity/<%= camelize(name) %>"], { relativeTo: this.route });
    await this.router.navigate(["/identity/<%= camelize(name) %>"], { relativeTo: this.route, replaceUrl: true });
  }

}
