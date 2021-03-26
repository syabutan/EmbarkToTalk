import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TalkPage } from '../talk/talk.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const model = await this.modalCtrl.create({
      component: TalkPage,
    });
    return await model.present();
  }

}
