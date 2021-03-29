import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkPageRoutingModule } from './talk-routing.module';

import { TalkPage } from './talk.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalkPageRoutingModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule
    ],
  declarations: [
    TalkPage
    ]
})
export class TalkPageModule {}
