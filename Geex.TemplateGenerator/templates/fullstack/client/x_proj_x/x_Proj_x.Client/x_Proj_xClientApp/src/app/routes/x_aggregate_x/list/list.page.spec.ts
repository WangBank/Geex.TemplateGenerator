import { ComponentFixture, TestBed } from "@angular/core/testing";

import { x_Aggregate_xListPage } from "./list.page";

describe("x_Aggregate_xListPage", () => {
  let component: x_Aggregate_xListPage;
  let fixture: ComponentFixture<x_Aggregate_xListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(x_Aggregate_xListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
