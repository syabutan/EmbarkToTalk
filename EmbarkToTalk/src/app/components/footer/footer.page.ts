import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordAudio } from 'src/app/services/recordaudio.service';
import {EventEmitter} from '@angular/core'
import { CheckSentence } from 'src/app/services/checksentence.service';
import { NextSentenceService } from 'src/app/services/nextsentence.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})


export class FooterPage implements OnInit {
  @Output() userText = new EventEmitter<string>();
  recordStart: boolean;
  userVoiceText = [];
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  voiceTextReady: boolean = false;
  score: number = 0;

  constructor(private nextSentence: NextSentenceService, private activatedRoute: ActivatedRoute, private recordAudio: RecordAudio, private checkSentence: CheckSentence) { }

  ngOnInit() {
    this.recordStart = true;

    this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionDisabled = change
    );

    this.recordAudio.userVoiceTextChanged.subscribe(
      (change: any[]) => this.userVoiceText = change
    );

    this.recordAudio.voiceTextReadyChanged.subscribe(
      (change: boolean) => this.voiceTextReady = change
    );

    this.recordAudio.voiceActiveSectionSuccessChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionSuccess = change
    );

    this.recordAudio.voiceActiveSectionErrorChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionError = change
    );

    this.recordAudio.voiceActiveSectionListeningChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionListening = change
    );

    this.recordAudio.voiceTextChanged.subscribe(
      (change: any) => this.voiceText = change, this.recordStart = true
    );

    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
  	this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
  	this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
  	this.voiceActiveSectionListening = this.voiceActiveSectionListening;
  	this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.recordStart = true;
  }

  onStartVoiceRecognition(){
    this.recordStart = !this.recordStart;
    //this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
    console.log("okkkkk");
  }

  onCloseVoiceRecognition(){
    this.recordStart = !this.recordStart;
    //this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
  }



  onCheck(){
   this.score = this.checkSentence.check(this.voiceText);
   console.log(this.score);
    // this.showAccuracy = !this.showAccuracy;
    // if(this.choiceOne !== ''){
    //   if(this.choiceTwo !==''){
    //     this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo,this.voiceText));
    //   }
    //   else {this.score = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);}
    // }
    // else if (this.choiceTwo !== ''){
    //   this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
    // }

    // this.score = this.checkSentence.checkPercent(this.,this.voiceText);
    if(this.score > .8){
      console.log(this.score);
      this.nextSentence.onNextSentence();
      // this.videoCount +=1;
      //this.guideSentence = 'Good Job!'
      this.userVoiceText = [];
      this.recordAudio.clearText();
      // this.videoUrl = this.videoBase + this.videoTimeJapanese[this.videoCount];
      //this.sentenceCounter +=1;
      //this.computerSentence = this.convoEnglishCom[this.sentenceCounter];
      //this.choiceOne = this.convoEnglishUser[this.sentenceCounter];
      //this.choiceTwo = this.convoEnglishUser[this.sentenceCounter + 1];
    //   let audio = new Audio();
    //   audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    // audio.load();
    // audio.play();
    }
    else if(this.score < .8){
      console.log(this.score)
      //this.guideSentence = 'Try again :)'
    }
  }
}
