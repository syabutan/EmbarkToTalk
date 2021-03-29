import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  recordStart: boolean;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recordStart = true;
  }

  onStartVoiceRecognition()
  {
    this.recordStart = !this.recordStart;
  }


}
