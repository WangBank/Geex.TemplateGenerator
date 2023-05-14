import { Component, Injector, OnInit } from "@angular/core";
import { deepCopy } from "@delon/util";
import { Apollo } from "apollo-angular";
import _ from "lodash";
import { take } from "rxjs/operators";

import { BusinessComponentBase } from "../../../shared/components";
import {
  I<%= classify(name) %>,
  <%= classify(name) %>sGql,
  <%= classify(name) %>sQuery,
  <%= classify(name) %>sQueryVariables,
} from "../../../shared/graphql/.generated/type";
import { <%= classify(name) %>EditPage } from "../edit/edit.page";

export type <%= classify(name) %>ListPageParam = {
  id: string;
  filterText: string;
};


@Component({
  templateUrl: "./list.page.html",
  styles: [],
})
export class <%= classify(name) %>ListPage extends BusinessComponentBase<<%= classify(name) %>ListPageParam,<%= classify(name) %>> {
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
      total: res.data.x_aggregate_xs.totalCount,
      data: res.data.x_aggregate_xs.items,
    };
  }
  async prepare(params: <%= classify(name) %>ListPageParam) {
    await super.prepare(params);
  }

  data = [];

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
}
