import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessComponentBase } from '../../../../shared/components/business.component.base';
import {
  <%= classify(name) %>sQuery,
  <%= classify(name) %>sQueryVariables,
  <%= classify(name) %>sGql,
  <%= classify(name) %>DetailFragment,
  <%= classify(name) %>BriefFragment,
} from '../../../../shared/graphql/.generated/type';

@Component({
  selector: 'app-<%= name %>-view',
  templateUrl: './view.component.html',
})
export class <%= classify(name) %>ViewComponent extends BusinessComponentBase {
  $init: Observable<any>;

  id: string;
  data: <%= classify(name) %>BriefFragment & <%= classify(name) %>DetailFragment;

  constructor(injector: Injector) {
    super(injector);
    this.$init = this.$routeChange.pipe(
      map(async (params) => {
        this.id = params.id;
        let res = await this.apollo
          .query<<%= classify(name) %>sQuery, <%= classify(name) %>sQueryVariables>({
            query: <%= classify(name) %>sGql,
            variables: {
              where: {
                id: {
                  eq: params.id,
                },
              },
              includeDetail: true,
            },
          })
          .toPromise();
        this.loading = res.loading;
        this.data = res.data.<%= name %>s.items[0];
      }),
    );
  }
  edit() {
    this.router.navigate(['<%= module %>', 'edit', this.id]);
  }
  reload() {
    this.router.navigate([], { skipLocationChange: true });
  }
}
