import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
    ComponentsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 30,
      outerStrokeWidth: 3,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      titleFontSize: "10",
      subtitle: "correct",
      showInnerStroke: false,
      imageHeight: 100,
      imageWidth: 100
    })
  ],
  declarations: [SpanishPage]
})
export class SpanishPageModule {}
