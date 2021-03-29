import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpanishPage } from './spanish.page';

const routes: Routes = [
  {
    path: '',
    component: SpanishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpanishPageRoutingModule {}
