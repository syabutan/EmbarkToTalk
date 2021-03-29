import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JapanesePageRoutingModule } from './japanese-routing.module';

import { JapanesePage } from './japanese.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JapanesePageRoutingModule,
    ComponentsModule
  ],
  declarations: [JapanesePage]
})
export class JapanesePageModule {}
