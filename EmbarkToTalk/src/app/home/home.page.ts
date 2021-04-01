import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Lang } from '../talk/lang.model';
import { LangsService } from '../talk/langs.service';
import { TalkPage } from '../talk/talk.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  langs: Lang[];
  private langSwitch : FormGroup;

  constructor(
    private langService: LangsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute 
  ) {
    this.langSwitch = this.formBuilder.group({
      langFrom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      langTo: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  langForm() {
    console.log(this.langSwitch)
  }

  ngOnInit() {
    this.langs = this.langService.getAllLangs();

  }



}
