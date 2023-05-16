import { Component, Injector, OnInit } from "@angular/core";
import { deepCopy } from "@delon/util";
import { Apollo } from "apollo-angular";
import _ from "lodash";
import { take } from "rxjs/operators";

import { ListDataContext, RoutedListComponent } from "../../../shared/components/routed-list.component.base";
import { <%= classify(name) %>, <%= classify(name) %>sGql, <%= classify(name) %>sQuery, Delete<%= classify(name) %>sGql, <%= classify(name) %>sQueryVariables } from "../../../shared/graphql/.generated/type";
import { <%= classify(name) %>EditPage } from "../edit/edit.page";

export type <%= classify(name) %>ListPageParam = {
  pi: number;
  ps: number;
  filterText: string;
};

@Component({
  selector: "app-<%= classify(name) %>s-list",
  templateUrl: "./list.page.html",
  styles: [],
})
export class <%= classify(name) %>ListPage extends RoutedListComponent<<%= classify(name) %>ListPageParam, <%= classify(name) %>, ListDataContext<<%= classify(name) %>>> {
  async fetchData(): Promise<ListDataContext<Partial<<%= classify(name) %>>>> {
    let params = this.params.value;
    let res = await this.apollo
      .query<<%= classify(name) %>sQuery, <%= classify(name) %>sQueryVariables>({
        query: <%= classify(name) %>sGql,
        variables: {
          input: { name: params.filterText },
          skip: Number(((params.pi ?? 1) - 1) * 10),
          take: Number(params.ps ?? 10),
        },
      })
      .toPromise();
    this.loading = res.loading;
    this.selectedData = [];
    return {
      total: res.data.<%= camelize(name) %>s.totalCount,
      data: deepCopy(res.data.<%= camelize(name) %>s.items),
    };
  }

  async prepare(params: <%= classify(name) %>ListPageParam) {
    await super.prepare(params);
  }

  constructor(injector: Injector) {
    super(injector);
  }

  filter: string;

  async add() {
    await this.router.navigate(["./edit"], { relativeTo: this.route });
  }

  async refresh() {
    return super.refresh();
  }

  async edit(id: string) {
    await this.router.navigate(["./edit", id], { relativeTo: this.route });
  }

  async delete(id: string) {
    await this.apollo
      .mutate({
        mutation: Delete<%= classify(name) %>sGql,
        variables: {
          ids: [id],
        },
      })
      .toPromise();
    this.msgSrv.success("已删除");
    this.refresh();
  }
}
