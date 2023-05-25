import { Component, Injector, OnInit } from "@angular/core";
import { STChange } from "@delon/abc/st";
import { deepCopy } from "@delon/util";
import { Apollo } from "apollo-angular";
import _ from "lodash";
import { take } from "rxjs/operators";

import {
  ListDataContext,
  ListPageParams,
  RoutedListComponent,
} from "../../../shared/components/routed-components/routed-list.component.base";
import { <%= classify(aggregateName) %>BriefFragment,
  <%= classify(aggregateName) %>sGql,
  <%= classify(aggregateName) %>sQuery,
  Delete<%= classify(aggregateName) %>sGql,
  <%= classify(aggregateName) %>sQueryVariables,
  SortEnumType } from "../../../shared/graphql/.generated/type";
import { <%= classify(aggregateName) %>EditPage } from "../edit/edit.page";

export type <%= classify(aggregateName) %>ListPageParam = ListPageParams<<%= classify(aggregateName) %>BriefFragment> & {
  filterText: string;
};

@Component({
  selector: "app-<%= dasherize(aggregateName) %>-list",
  templateUrl: "./list.page.html",
  styles: [],
})
export class <%= classify(aggregateName) %>ListPage extends RoutedListComponent<<%= classify(aggregateName) %>ListPageParam, <%= classify(aggregateName) %>BriefFragment> {
  override async fetchData(): Promise<ListDataContext<Partial<<%= classify(aggregateName) %>BriefFragment>>> {
    let params = this.params.value;
    let res = await this.apollo
      .query<<%= classify(aggregateName) %>sQuery, <%= classify(aggregateName) %>sQueryVariables>({
        query: <%= classify(aggregateName) %>sGql,
        variables: {
          input: { name: params.filterText },
          skip: Number(((params.pi ?? 1) - 1) * 10),
          take: Number(params.ps ?? 10),
          order: params.sort,
        },
      })
      .toPromise();
    this.loading = res.loading;
    this.selectedData = [];
    return {
      total: res.data.<%= camelize(aggregateName) %>s.totalCount,
      data: deepCopy(res.data.<%= camelize(aggregateName) %>s.items),
      columns: [
        {
          title: "",
          width: 30,
          type: "checkbox",
          index: "checked",
          fixed: "left",
          className: ["text-center"],
        },
        { title: "Id", index: "id", width: 200, className: ["text-center"] },
        {
          title: "名称",
          index: "name",
          sort: {
            key: "name",
            default: params.sort?.name,
          },
          // render: "name",
          className: ["text-center"],
        },
        {
          title: "创建时间",
          index: "createdOn",
          sort: {
            key: "createdOn",
            default: params.sort?.createdOn,
          },
          type: "date",
        },
        {
          title: "操作",
          buttons: [
            {
              icon: "edit",
              text: "编辑",
              click: item => this.router.navigate(["edit"], { queryParams: { id: item.id }, relativeTo: this.route }),
              // acl: AppPermission.<%= classify(name) %>MutationEdit<%= classify(aggregateName) %>,
            },
          ],
          className: ["text-center"],
        },
      ],
    };
  }

  override async prepare(params: <%= classify(aggregateName) %>ListPageParam) {
    await super.prepare(params);
  }

  constructor(injector: Injector) {
    super(injector);
  }

  filter: string;

  async add() {
    await this.router.navigate(["./edit"], { relativeTo: this.route });
  }

  override async refresh() {
    return super.refresh();
  }

  override async reset() {
    return super.reset();
  }
  async edit(id: string) {
    await this.router.navigate(["./edit"], { queryParams: { id }, relativeTo: this.route });
  }

  async delete(id: string) {
    await this.apollo
      .mutate({
        mutation: Delete<%= classify(aggregateName) %>sGql,
        variables: {
          ids: [id],
        },
      })
      .toPromise();
    this.msgSrv.success("已删除");
    this.refresh();
  }

   override async tableChange(args: STChange) {
    return super.tableChange(args);
  }
}
