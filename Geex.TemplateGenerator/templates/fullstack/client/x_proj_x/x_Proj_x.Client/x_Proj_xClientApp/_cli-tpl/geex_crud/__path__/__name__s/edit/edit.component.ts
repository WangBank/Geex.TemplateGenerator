import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BusinessComponentBase } from '../../../../shared/components/business.component.base';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Edit<%= classify(name) %>Gql,
  Create<%= classify(name) %>Gql,
  I<%= classify(name) %>,
  <%= classify(name) %>sGql,
  <%= classify(name) %>sQuery,
  <%= classify(name) %>sQueryVariables,
} from '../../../../shared/graphql/.generated/type';
import { EditMode } from '../../../../shared/types/common';

@Component({
  selector: 'app-<%= name %>-edit',
  templateUrl: './edit.component.html',
})
export class <%= classify(name) %>EditComponent extends BusinessComponentBase {
  $init: Observable<any>;
  mode: EditMode;
  id: string;
  data: I<%= classify(name) %>;
  @ViewChild('sf')
  readonly sf!: SFComponent;
  schema: SFSchema = {
    properties: {
      // name: { type: 'string', title: '名称', widget: 'text' },
      // <%= name %>Type: {
      //   type: 'string',
      //   title: '消息类型',
      //   widget: 'select',
      //   enum: Object.entries(<%= classify(name) %>Type).map((x) => ({ label: x[0], value: x[1] })),
      // },
      // severity: {
      //   type: 'string',
      //   title: '重要性',
      //   widget: 'select',
      //   enum: Object.entries(<%= classify(name) %>SeverityType).map((x) => ({ label: x[0], value: x[1] })),
      // },
    },
    required: ['name', /*'<%= name %>Type', 'severity'*/],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
  };

  constructor(injector: Injector) {
    super(injector);
    this.$init = this.$routeChange.pipe(
      map(async (params) => {
        this.id = params.id;
        this.mode = params.id == undefined ? 'create' : 'edit';
        if (params.id) {
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
          this.data = res.data.<%= name %>s.items[0];
        } else {
          this.data = {
            // name: '',
          };
        }
      }),
    );
  }

  async submit(value: Partial<I<%= classify(name) %>>): Promise<void> {
    if (this.mode == 'create') {
      let res = await this.apollo
        .mutate({
          mutation: Create<%= classify(name) %>Gql,
          variables: {
            input: {
              // name: value.name
            }
          },
        })
        .toPromise();
      if (res.data.create<%= classify(name) %>.id) {
        this.msgSrv.success('创建成功');
      }
    } else {
      let res = await this.apollo
        .mutate({
          mutation: Edit<%= classify(name) %>Gql,
          variables: {
            input: {
              id: this.id,
            // name: value.name
            }
          },
        })
        .toPromise();
      if (res.data.edit<%= classify(name) %>) {
        this.msgSrv.success('修改成功');
      }
    }
    await this.router.navigate(['<%= module %>', 'view', this.id], { replaceUrl: true });
  }
}
