import { ThisReceiver } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Lang } from '../talk/lang.model';
import { LangsService } from '../talk/langs.service';
import { TalkPage } from '../talk/talk.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class HomePage implements OnInit {
  langs: Lang[];
  chosenLangFrom = '';
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
    console.log(this.langSwitch.value.langFrom);
    console.log(this.langSwitch.value.langTo);
  }

  getLangInfo() {
    return [this.langSwitch];
  }

  ngOnInit() {
    this.langs = this.langService.getAllLangs();

  }



}
