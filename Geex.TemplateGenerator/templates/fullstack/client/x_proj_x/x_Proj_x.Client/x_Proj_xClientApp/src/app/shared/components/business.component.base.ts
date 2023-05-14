import { ChangeDetectorRef, Component, Injector, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivationStart, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { LoadingService as nzLoadingService, LoadingType } from "@delon/abc/loading";
import { ReuseTabService } from "@delon/abc/reuse-tab";
import { STColumnBadge } from "@delon/abc/st";
import { ACLService, ACLCanType } from "@delon/acl";
import { ModalHelper } from "@delon/theme";
import { Apollo, gql } from "apollo-angular";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { combineLatest, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { I18N, I18NService } from "../../core";
import { AppPermission, AuditStatus, SettingDefinition } from "../graphql/.generated/type";
import { CacheDataStateModel, CacheDataState$ } from "../states/cache-data.state";
import { AuditStatusOptions } from "../utils/common-options";
export type MethodName = "delete" | "audit" | "submit" | "unaudit" | "unsubmit";

export const AuditBadge: STColumnBadge = {
  AUDITED: { text: AuditStatusOptions.find(x => x.value == "AUDITED").label, color: "success" },
  SUBMITTED: { text: AuditStatusOptions.find(x => x.value == "SUBMITTED").label, color: "processing" },
  DEFAULT: { text: AuditStatusOptions.find(x => x.value == "DEFAULT").label, color: "warning" },
};

@Component({
  template: "",
})
export abstract class BusinessComponentBase<TParam = any, TDto = any> {
  apollo: Apollo;
  modal: ModalHelper;
  route: ActivatedRoute;
  router: Router;
  cdr: ChangeDetectorRef;
  $params: Observable<TParam>;
  msgSrv: NzMessageService;
  nzModalSrv: NzModalService;
  acl: ACLService;
  i18n: I18NService;
  loading: boolean;
  $init: Observable<any>;
  routerOutlet: RouterOutlet;
  selectedData: TDto[] = [];
  cache: CacheDataState$;
  nzLoadingSrv: nzLoadingService;
  I18N = I18N;
  AppPermission = AppPermission;
  reuseTabSrv: ReuseTabService;
  constructor(injector: Injector) {
    this.apollo = injector.get(Apollo);
    this.modal = injector.get(ModalHelper);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.cdr = injector.get(ChangeDetectorRef);
    this.msgSrv = injector.get(NzMessageService);
    this.acl = injector.get(ACLService);
    this.i18n = injector.get(I18NService);
    this.nzModalSrv = injector.get(NzModalService);
    this.routerOutlet = injector.get(RouterOutlet);
    this.cache = injector.get(CacheDataState$);
    this.nzLoadingSrv = injector.get(nzLoadingService);
    this.reuseTabSrv = injector.get(ReuseTabService);
  }
  log(x: any) {
    //console.log(x);
    return x;
  }
  ngOnInit(): any {
    let resolve = new Promise<void>(resolve => {
      combineLatest([this.route.params, this.route.data])
        .pipe(
          map(([pathParams, { params: queryParams }]) => {
            return { ...pathParams, ...queryParams };
          }),
        )
        .subscribe(async params => {
          const reuseItems = this.reuseTabSrv.items.map(x => x.url);
          if (!reuseItems.includes(this.router.url)) {
            await this.prepare(params);
          }
          this.$init = of({});
          resolve();
        });
    });
    return resolve;
  }
  /**
   * 表单/视图的准备流程, 通常用于准备下拉菜单或者根据参数动态渲染表单sf
   *
   * @param {TParam} params 页面支持传入的参数
   * @param {TResponse} data 后端响应对象
   * @memberof BusinessComponentBase
   */
  abstract prepare(params: TParam);

  isGranted(permission: ACLCanType) {
    return this.acl.can(permission);
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
  batchOperation(sth: MethodName, entityType: string, remark?: string) {
    return new Promise((resolve, reject) => {
      let ids = this.selectedData.map(x => x["id"]);
      let text = "";
      switch (sth) {
        case "delete":
        case "submit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Default).map(x => x["id"]);
          text = "只能操作未上报状态的数据";
          break;
        case "audit":
        case "unsubmit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Submitted).map(x => x["id"]);
          text = "只能操作已上报状态的数据";
          break;
        case "unaudit":
          ids = this.selectedData.filter(x => x["auditStatus"] === AuditStatus.Audited).map(x => x["id"]);
          text = "只能操作已审核状态的数据";
          break;
        default:
          break;
      }
      if (ids.length !== this.selectedData.length) {
        return this.msgSrv.warning(text);
      }
      if (!ids.any()) {
        this.msgSrv.warning("至少选择一项");
        return;
      }
      let apiName = gql`
      mutation ${sth}${entityType}($ids: [String], $remark:String) {
        ${sth}${entityType}(ids: $ids, remark:$remark)
      }
    `;
      if (sth === "delete") {
        apiName = gql`
          mutation ${sth}${entityType}($ids: [String]) {
            ${sth}${entityType}(input: { ids: $ids })
          }
        `;
      }

      let alertMessage = this.I18N.Common.action.get(sth);
      this.nzModalSrv.confirm({
        nzTitle: `确认${alertMessage}吗？`,
        nzOnOk: async () => {
          await this.apollo
            .mutate({
              mutation: apiName,
              variables: {
                remark,
                ids,
              },
            })
            .toPromise();
          resolve(true);
          this.msgSrv.success(this.I18N.Common.message.get(sth));
        },
      });
    });
  }
}
