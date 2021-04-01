import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { RecordAudio } from 'src/app/services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { GoogletranslateService } from '../../services/googletranslate.service';
// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ModalController} from "@ionic/angular"
import { NextSentenceService } from 'src/app/services/nextsentence.service';

@Component({
  selector: 'app-japanese',
  templateUrl: './japanese.page.html',
  styleUrls: ['./japanese.page.scss'],
})
export class JapanesePage implements OnInit {
  //To record voice 
  userVoiceText = [];
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any = '';
  voiceTextReady: boolean = false;
  
  sentenceCounter = 0; 

  //Where to start and stop video for each line 
  videoTimeJapanese = ["0,1","2,7", "8,10", "11,12", "13,14", "15,22"];
  videoUrl: SafeResourceUrl;
  videoBase = "../../assets/videos/conversationJP.mp4#t=";
  videoCount = 0;

  //To know whether to show L1 or L2
  choiceOneTrans = false;
  choiceTwoTrans = false;
  choiceComputerTrans = false;
  choiceUserTrans = false;
  choiceOneTran = false;

  langFrom = new FormControl('en');
  langTo = new FormControl('en');

  private translateBtn: any;

  score: number = 0;

  //Japanese tree
  userChoiceOneArray = ['hey how is it going','はい元気です。元気ですか？', '私は山田長老です。お名前は何ですか？','私は田中姉妹です。お名前は何ですか？','私たちは宣教師で、イエスキリストについて教えています。','私たちはボランティアとして奉仕するために来ました。'];
  userChoiceTwoArray = ['hello','はい元気です。私たちは最近この近くに引っ越してきました。地元の方ですか？','私たちは宣教師で、イエスキリストについて教えています。','私たちはボランティアとして奉仕するために来ました。','福音を学ぶことに興味がありますか？','宣教師について聞いたことがありますか？'];                         
  computerSentenceArrayTwo = ['こんにちは。元気ですか？','そうなんですね。私はここに10年間住んでいます。何をしに引っ越してきたんですか？','キリストについては学んだことないですね。','素晴らしいですね。','はい、聞いてみたいです。','教会に行っている友達がいますが、そのことについてあまり話したことがありません。学んでみたいと思っていました。'];

  showAccuracy: boolean;
  langSwitch: boolean;

  //stores the translations
  data: Solution = {
    firstChoice: '',
    secondChoice: '',
    userText: '',
    computerText: ''
  };

  cpImage ="../../../assets/icon/face1.PNG"
  userImage ="../../../assets/icon/blank.webp"

  //store user choices and computer responce
  computerSentence: string = '';
  choiceOne: string = '';
  choiceTwo: string = '';

  constructor(private nextSentence: NextSentenceService, private modalCtrl: ModalController, private google: GoogletranslateService , private solution: SolutionService, private recordAudio: RecordAudio, private checkSentence: CheckSentence) {
    this.videoUrl = this.videoBase + this.videoTimeJapanese[0];
    this.showAccuracy = true;
    this.langSwitch = false;
    this.computerSentence = this.computerSentenceArrayTwo[this.sentenceCounter];
    this.choiceOne = this.userChoiceOneArray[this.sentenceCounter];
  }



  ngOnInit() {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
    console.log(this.translateBtn);
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
      (change: any) => {this.voiceText = change; this.onCheck(); this.send("")}
    );
    
    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
  	this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
  	this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
  	this.voiceActiveSectionListening = this.voiceActiveSectionListening;
  	this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.checkSentence.updateSentences(this.choiceOne,this.choiceTwo, this.voiceText);
    this.sentenceCounter = this.nextSentence.nextSentence;
  }

  onStartVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
    console.log(this.voiceText)
  }

  onCloseVoiceRecognition(){
    //this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
  }


  onStart(){
    //this.currentSentence = this.practiceParagraphBrown[this.sentenceCounter];
  }

  onCheck(){
    if(this.voiceText === undefined){
      return;
    }
    this.showAccuracy = !this.showAccuracy;
    if(this.choiceOne !== ''){
      if(this.choiceTwo !==''){
        this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo,this.voiceText));
      }
      else {this.score = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);}
    }
    else if (this.choiceTwo !== ''){
      this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
    }

    // this.score = this.checkSentence.checkPercent(this.,this.voiceText);
    if(this.score > .8){
      this.videoCount +=1;
      this.sentenceCounter+=1;

      this.userVoiceText = [];
      this.recordAudio.clearText();
      this.videoUrl = this.videoBase + this.videoTimeJapanese[this.videoCount];
      this.computerSentence = this.computerSentenceArrayTwo[this.sentenceCounter];
      this.choiceOne = this.userChoiceOneArray[this.sentenceCounter];
    this.choiceTwo = this.userChoiceOneArray[this.sentenceCounter+1];
    //   let audio = new Audio();
    //   audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    // audio.load();
    // audio.play();
    }
    else if(this.score < .8){
      //this.guideSentence = 'Try again :)'
    }
  }

  onListenToSentence(){
    let audio = new Audio();
    //audio.src = this.practiceParagraphBrownAudio[this.sentenceCounter];
    audio.load();
    audio.play();
  }

  onListenAgain(){
    let audio = new Audio();
    //audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    audio.load();
    audio.play();
  }
  //Sends sentences to Google translate 
  send(paragraphSel: string) {

    if(paragraphSel === 'choiceOne'){
      console.log(this.choiceOneTrans)
      this.choiceOneTran = !this.choiceOneTran;
    }
    if(paragraphSel === 'choiceTwo'){
      this.choiceTwoTrans = !this.choiceTwoTrans;
    }
    if(paragraphSel === 'computerText'){
      this.choiceComputerTrans = !this.choiceComputerTrans;
    }
    if(paragraphSel === 'userText'){
      console.log(this.choiceUserTrans)
      this.choiceUserTrans = !this.choiceUserTrans;
    }

    if(this.voiceText === undefined){
      this.voiceText = '';
    }
    console.log(this.choiceOne,this.choiceTwo,this.voiceText,this.computerSentence);
    const googleObj: GoogleObj = {
      q: [this.choiceOne, this.choiceTwo, this.voiceText, this.computerSentence],
      target: this.langTo.value
    };

    this.translateBtn.disabled = true;

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          firstChoice: res.data.translations[0].translatedText.replace(/&#39;/g, "'"),
        	secondChoice: res.data.translations[1].translatedText,
        	userText: res.data.translations[2].translatedText,
          computerText: res.data.translations[3].translatedText
        };
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Changes if it is using L1 or L2
  onSwitch() {
    this.langSwitch = !this.langSwitch;
  }
}
