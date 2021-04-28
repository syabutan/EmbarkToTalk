import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckSentence } from '../services/checksentence.service';
import { RecordAudio } from 'src/app/services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../models/solution';
import { Treenode, TreenodeComputer } from '../models/tree-node';
import { SolutionService } from '../services/solution.service';
import { GoogletranslateService } from '../services/googletranslate.service';
// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ModalController} from "@ionic/angular"
import { NextSentenceService } from 'src/app/services/nextsentence.service';
import { JapaneseService } from '../services/lessons/japanese.service';
import { Lesson  } from '../services/lesson.model';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-spanitalksh',
  templateUrl: './talk.page.html',
  styleUrls: ['./talk.page.scss'],
})


export class TalkPage implements OnInit {
  //To record voice 
  userVoiceText = [];
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any = '';
  voiceTextReady: boolean = false;
  inputString = '';
  userVoice: any = '';
  userVoiceArray = [];
  notPlaying = true;
  audio = new Audio();
  userTextCorrect = "";
  userTextCorrectAudio = "";
  userTextCorrectTrans = '';
  sentenceNum = 1;

  lessonCompleted = false;

  // lesson1: Lesson1[];


  
  sentenceCounter = 0; 

  //Where to start and stop video for each line 
  // videoTimeJapanese = ["0,2","3,5", "6,10", "10,17", "17,21", "21,23", "24,26", "27,34"];
  videoUrl: SafeResourceUrl;
  // videoBase = "../assets/videos/JapaneseConversation.mp4#t=";
  videoBase = '';
  videoCount = 0;

  // audioBase = "../../assets/soundFile/japanese/";
  audioBase = '';


  //To know whether to show L1 or L2
  choiceOneTrans = false;
  choiceTwoTrans = false;
  choiceComputerTrans = false;
  choiceUserTrans = false;
  choiceOneTran = false;
  voiceTextTrans = [];
  userArray = [];

  langFrom = new FormControl('ja');
  langTo = new FormControl('en');
  langArray;

  private translateBtn: any;

  scoreLeft: number = 0;
  scoreRight: number = 0;
  score: number = 0;

  //Japanese tree
  computerSentenceArray = [];
  showAccuracy: boolean;
  langSwitch: boolean;

  //stores the translations
  data: Solution = {
    firstChoice: '',
    secondChoice: '',
    userText: '',
    computerText: '',
    inputString: ''
  };

  serviceArray;
  refArray;


  // ../../../assets/icon/sammy.png
  cpImage = '';
  userImage ="../../../assets/icon/blank.webp"

  //store user choices and computer responce
  computerSentence: string = '';
  choiceOne;
  choiceTwo;

  conversationLog = [{computer: '', player: ''}];
  logNum = 0;  

  showVoiceText: boolean;
  showVoiceText2: boolean;

  listenTrue = false;

  constructor(
    private nextSentence: NextSentenceService, 
    private modalCtrl: ModalController, 
    private google: GoogletranslateService , 
    private solution: SolutionService, 
    private recordAudio: RecordAudio, 
    private checkSentence: CheckSentence,
    private jpnservice: JapaneseService,
    private langChange: HomePage) {
      // this.langArray = this.langChange.getLangInfo();
      // console.log("reading talkPage " + this.langArray.value.langFrom);
    // console.log("langage from " + this.langArray.value.langFrom + " to " + this.langArray.value.langTo);
    // this.langFrom = new FormControl(this.langArray.value.langFrom);
    // this.langTo = new FormControl(this.langArray.value.langTo);

      this.refArray = this.jpnservice.getAllRef();
      this.videoBase = this.refArray[0].videoRef;
      this.audioBase = this.refArray[0].voiceRef;
      this.cpImage = this.refArray[0].faceIcon;
      this.serviceArray = this.jpnservice.getAllArrays();
      this.showAccuracy = true;
      this.langSwitch = true;
      this.computerSentence = this.serviceArray[1].computer;
      this.choiceOne = this.serviceArray[2];
      this.choiceTwo = this.serviceArray[3];
      this.videoUrl = this.videoBase + this.serviceArray[1].video;
      this.conversationLog = [];
      this.showVoiceText = false;
      this.showVoiceText2 = false;
  }


  ngOnInit() {

    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
    console.log(this.translateBtn);
    this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionDisabled = change
    );

    this.recordAudio.userVoiceTextChanged.subscribe(
      (change: any[]) => {this.userVoiceText = change}
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
      (change: any) => {this.voiceText = change; if(change !== undefined){this.userArray.push(change)}; if(change !== undefined){this.send(change)}; this.onCheck();}
    );

    this.recordAudio.userAudioChanged.subscribe(
      (change: any) => {this.userVoice = change; 
        this.userVoiceArray.push(change);}
    );

    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
  	this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
  	this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
  	this.voiceActiveSectionListening = this.voiceActiveSectionListening;
  	// this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.checkSentence.updateSentences(this.choiceOne.player,this.choiceTwo.player, this.voiceText);
    this.sentenceCounter = this.nextSentence.nextSentence;
  }
  
  onStartVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
    this.showVoiceText = true;
    console.log("you just said " + this.voiceText);
  }

  onCloseVoiceRecognition(){
    //this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
    this.showVoiceText = false;
  }

  onStart(){
    //this.currentSentence = this.practiceParagraphBrown[this.sentenceCounter];
  }

  onCheck(){
    this.showVoiceText = true;
    if(this.voiceText === undefined){
      return;
    }
    this.showAccuracy = !this.showAccuracy;
    this.scoreLeft = this.checkSentence.checkPercent(this.choiceOne.player,this.voiceText);
    this.scoreRight = this.checkSentence.checkPercent(this.choiceTwo.player,this.voiceText);
    this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne.player,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo.player,this.voiceText));

    // this.score = this.checkSentence.checkPercent(this.,this.voiceText);
    if(this.scoreLeft >= .7){
      this.sentenceNum = parseInt(this.choiceOne.id);
      
      this.conversationLog.push({
        computer: this.serviceArray[this.sentenceNum/2].computer,
        player: this.voiceText
        });
      this.logNum += 1;
      this.voiceText = '...';
      this.showVoiceText2 = false;
    }
    else if(this.scoreRight >= .7){
      this.sentenceNum = parseInt(this.choiceTwo.id);

      this.conversationLog.push({
        computer: this.serviceArray[(this.sentenceNum-1)/2].computer,
        player: this.voiceText
        });
      this.logNum += 1;
      this.voiceText = '...';
      this.showVoiceText2 = false;
    }
    else{
      this.showVoiceText = false;
      this.showVoiceText2 = true;
    }
    
    if ((this.sentenceNum * 2) >= this.serviceArray.length)
    {
      this.computerSentence = this.serviceArray[this.sentenceNum].computer;
      this.userTextCorrect = this.voiceText;
      this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;
      this.voiceText = '...';

      setTimeout(() => {
        this.audio.pause();
        this.audio.src = "../assets/soundFile/complete/firework.mp3#t=0,10"; 
        this.audio.load();
        this.audio.play();
      }, 5000);
      this.lessonCompleted = true;
    }
    else
    {
    this.choiceOne = this.serviceArray[(this.sentenceNum * 2)];
    this.choiceTwo = this.serviceArray[(this.sentenceNum * 2) + 1];

    this.computerSentence = this.serviceArray[this.sentenceNum].computer;

    this.userTextCorrect = this.voiceText;
    this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;

    this.recordAudio.userVoiceText = [];
    this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
    }
    this.showVoiceText = false;
  }

  onListenToSentence(num: number){
    //1 is left, two is right
    if(num === 1){
      console.log(this.sentenceNum);
      this.audio.pause();
      this.audio.src = this.audioBase + (this.sentenceNum * 2).toString() + "p.m4a"; 
      this.audio.load();
      this.audio.play();
    }
    else if(num === 2){
      this.audio.pause();
      this.audio.src = this.audioBase + (this.sentenceNum * 2 + 1).toString() + "p.m4a"; 
      this.audio.load();
      this.audio.play();
    }
    else if(num === 3){
      this.audio.pause();
      this.audio.src = this.audioBase + (this.sentenceNum).toString() + "c.m4a"; 
      this.audio.load();
      this.audio.play();
    }

  }

  //Replay video -- not working because the source remains the same
  onReplayVideo(){
    this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;
    console.log(this.videoUrl)
  }

  onStopListening(){
    this.audio.pause();
    this.notPlaying = !this.notPlaying;
  }
  onListenAgain(){

    let audio = new Audio();
    //audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    audio.load();
    audio.play();
  }

  playUserAudio(num){
  if(!this.userTextCorrect){
    if(num >= 0){
      this.audio.pause();
      console.log(num);
      this.audio.src = this.userVoiceArray[num];
      this.audio.load();
      this.audio.play();
    }
    else{
      this.audio.pause();
      console.log(num);
      this.audio.src = num;
      this.audio.load();
      this.audio.play();
    }
  }
  else{
    if(num === 99){
      console.log(num);
      this.audio.src = this.userVoiceArray[0];
      this.audio.load();
      this.audio.play();
  }
    if(num >= 0){
      this.audio.pause();
      console.log(num);
      this.audio.src = this.userVoiceArray[num+1];
      this.audio.load();
      this.audio.play();
    }
    else{
      this.audio.pause();
      console.log(num);
      this.audio.src = num;
      this.audio.load();
      this.audio.play();
    }
  }
    
  }

  setUserArray(check: string, num: number){
    if(!this.userTextCorrect){
      if(check === this.userVoiceText[num]){
        this.userArray[num] = this.voiceTextTrans[num];
      }
      else if(check === this.voiceTextTrans[num]){
        this.userArray[num] = this.userVoiceText[num];
      }

    }
    else{
      if(check === this.userVoiceText[num+1]){
        this.userArray[num] = this.voiceTextTrans[num+1];
      }
      else if(check === this.voiceTextTrans[num+1]){
        this.userArray[num] = this.userVoiceText[num+1];
      }
    }
    
  }
  
  //Sends sentences to Google translate 
  send(paragraphSel: string) {
    console.log(paragraphSel);
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
    if(paragraphSel !== 'userText' && paragraphSel !== 'choiceOne'&& paragraphSel !== '' && paragraphSel !== 'computerText'&& paragraphSel !== 'choiceTwo'){
      this.inputString = paragraphSel;
    }
    console.log(this.choiceOne.player,this.choiceTwo.player,this.voiceText,this.computerSentence);
    const googleObj: GoogleObj = {
      q: [this.choiceOne.player, this.choiceTwo.player, this.voiceText, this.computerSentence, this.inputString],
      target: this.langTo.value
    };

    this.translateBtn.disabled = true;

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          firstChoice: res.data.translations[0].translatedText.replace(/&#39;/g, "'"),
        	secondChoice: res.data.translations[1].translatedText.replace(/&#39;/g, "'"),
        	userText: res.data.translations[2].translatedText.replace(/&#39;/g, "'"),
          computerText: res.data.translations[3].translatedText.replace(/&#39;/g, "'"),
          inputString: res.data.translations[4].translatedText.replace(/&#39;/g, "'")
        };
        if(this.voiceTextTrans.length < this.userVoiceText.length){
          console.log(this.userVoiceArray)
          this.voiceTextTrans.push(res.data.translations[4].translatedText.replace(/&#39;/g, "'"));
          console.log(this.voiceTextTrans)
          this.userTextCorrectTrans = this.voiceTextTrans[0];

        }
      },
      err => {
        console.log(err);
      }
    );
    this.userTextCorrectTrans = this.voiceTextTrans[0];
    // this.onCheck();
  }

  //Changes if it is using L1 or L2
  onSwitch() {
    this.langSwitch = !this.langSwitch;
  }
}
