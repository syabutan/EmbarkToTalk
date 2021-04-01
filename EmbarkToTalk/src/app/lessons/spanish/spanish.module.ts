import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpanishPageRoutingModule } from './spanish-routing.module';

import { SpanishPage } from './spanish.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpanishPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SpanishPage]
})
export class SpanishPageModule {}
