import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JapanesePage } from './japanese.page';

const routes: Routes = [
  {
    path: '',
    component: JapanesePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JapanesePageRoutingModule {}
