import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadowreadPage } from './shadowread.page';

const routes: Routes = [
  {
    path: '',
    component: ShadowreadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadowreadPageRoutingModule {}
