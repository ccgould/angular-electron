import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ModItemComponent } from './mod-item/mod-item.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [HomeComponent, ModItemComponent,FilterPipe],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
