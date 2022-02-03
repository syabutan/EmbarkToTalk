import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicModule } from '@ionic/angular';
import { ShadowPage } from './shadow.page';
import { ShadowPageRoutingModule } from './shadow-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadowPageRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 30,
      outerStrokeWidth: 3,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      titleFontSize: "10",
      subtitle: "match",
      showInnerStroke: false,
      imageHeight: 100,
      imageWidth: 100
    })
  ],
  declarations: [ShadowPage]
})
export class ShadowPageModule {}
