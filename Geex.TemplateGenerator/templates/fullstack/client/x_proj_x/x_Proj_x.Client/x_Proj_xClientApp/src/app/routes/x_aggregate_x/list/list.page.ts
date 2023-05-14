import { Component, Injector, OnInit } from "@angular/core";
import { deepCopy } from "@delon/util";
import { Apollo } from "apollo-angular";
import _ from "lodash";
import { take } from "rxjs/operators";

import { BusinessComponentBase } from "../../../shared/components";
import { ListDataContext, RoutedComponent } from "../../../shared/components/routed.component.base";
import {
  x_Aggregate_x,
  x_Aggregate_xsGql,
  x_Aggregate_xsQuery,
  x_Aggregate_xsQueryVariables,
} from "../../../shared/graphql/.generated/type";
import { x_Aggregate_xEditPage } from "../edit/edit.page";

export type x_Aggregate_xListPageParam = {
  pi: number;
  ps: number;
  filterText: string;
};

@Component({
  templateUrl: "./list.page.html",
  styles: [],
})
export class x_Aggregate_xListPage extends RoutedComponent<x_Aggregate_xListPageParam, ListDataContext<Partial<x_Aggregate_x>>> {
  async fetchData(): Promise<ListDataContext<Partial<x_Aggregate_x>>> {
    let params = this.params.value;
    let res = await this.apollo
      .query<x_Aggregate_xsQuery, x_Aggregate_xsQueryVariables>({
        query: x_Aggregate_xsGql,
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
  async prepare(params: x_Aggregate_xListPageParam) {
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
}
