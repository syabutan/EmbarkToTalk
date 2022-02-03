import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpanishPageRoutingModule } from './spanish-routing.module';
import { SpanishPage } from './spanish.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomePage } from '../../home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpanishPageRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 30,
      outerStrokeWidth: 3,
      innerStrokeWidth: 8,
      outerStrokeColor: "#d17d00",
      innerStrokeColor: "#a4adb3",
      animationDuration: 300,
      titleFontSize: "11",
      subtitle: "match",
      showInnerStroke: false,
      imageHeight: 100,
      imageWidth: 100
    })
    ],
  declarations: [
    SpanishPage
    ],
  providers: [
    HomePage
  ]
})
export class SpanishPageModule {}
