import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "@shared";

import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';

import { <%= classify(aggregateName) %>ListPage } from './list/list.page';
import { <%= classify(aggregateName) %>EditPage } from './edit/edit.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    <%= classify(name) %>RoutingModule
  ],
  declarations: [<%= classify(aggregateName) %>ListPage,<%= classify(aggregateName) %>EditPage]
})
export class <%= classify(name) %>Module {}
