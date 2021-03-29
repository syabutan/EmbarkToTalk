import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Lang } from './lang.model';
import { LangsService } from './langs.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.page.html',
  styleUrls: ['./talk.page.scss'],
})
export class TalkPage implements OnInit {
  langs: Lang[];

  cpImage = "../../assets/icon/blank.webp";

  videoUrl: SafeResourceUrl;
  videoTimeJapanese = ["0,1","2,7", "8,10", "11,12", "13,14", "15,22"];
  videoBase = "../../assets/videos/englishpractice.mp4#t=";
  videoTime = ["1,4","7,11", "14,17", "11,12", "13,14", "15,22"];
  videoCount = 0;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private langService: LangsService) 
    { 
    this.videoUrl = this.videoBase + this.videoTime[0];
    }

  ngOnInit() {
    this.langs = this.langService.getAllLangs();
  }

}
