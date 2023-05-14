import { ComponentFixture, TestBed } from "@angular/core/testing";

import { x_Aggregate_xPage } from "./x-aggregate-x.page";

describe("x_Aggregate_xPage", () => {
  let component: x_Aggregate_xPage;
  let fixture: ComponentFixture<x_Aggregate_xPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(x_Aggregate_xPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
