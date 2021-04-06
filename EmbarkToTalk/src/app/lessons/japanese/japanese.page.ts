import { Component, Input, OnInit, Output, ɵgetDebugNodeR2 } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { RecordAudio } from 'src/app/services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../../models/solution';
import { Treenode, TreenodeComputer } from '../../models/tree-node';
import { SolutionService } from '../../services/solution.service';
import { GoogletranslateService } from '../../services/googletranslate.service';
// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ModalController} from "@ionic/angular"
import { NextSentenceService } from 'src/app/services/nextsentence.service';
import { stringify } from '@angular/compiler/src/util';
import { ThrowStmt } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
  inputString = '';


  
  sentenceCounter = 0; 

  //Where to start and stop video for each line 
  videoTimeJapanese = ["0,2","3,5", "6,10", "10,17", "17,21", "21,23", "24,26", "27,34"];
  videoUrl: SafeResourceUrl;
  videoBase = "../../assets/videos/JapaneseConversation.mp4#t=";
  videoCount = 0;

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

  private translateBtn: any;

  scoreLeft: number = 0;
  scoreRight: number = 0;
  score: number = 0;


  //Japanese tree
  userChoiceOneArray = ['はい元気です。元気ですか？', '私は山田長老です。お名前は何ですか？','私は田中姉妹です。お名前は何ですか？','私たちは宣教師で、イエスキリストについて教えています。','私たちはボランティアとして奉仕するために来ました。'];
  userChoiceTwoArray = ['はい元気です。私たちは最近この近くに引っ越してきました。地元の方ですか？','私たちは宣教師で、イエスキリストについて教えています。','私たちはボランティアとして奉仕するために来ました。','福音を学ぶことに興味がありますか？','宣教師について聞いたことがありますか？'];                         
  computerSentenceArrayTwo = ['こんにちは。元気ですか？', '元気です。お名前は何ですか？', '私ははやとです。お二人は何をしていますか？', 'そうなんですね。私はここに10年間住んでいます。何をしに引っ越してきたんですか？','キリストについては学んだことないですね。','素晴らしいですね。','はい、聞いてみたいです。','教会に行っている友達がいますが、そのことについてあまり話したことがありません。学んでみたいと思っていました。'];
  computerSentenceArrayOne = ['こんにちは。元気ですか？','元気です。お名前は何ですか？','私ははやとです。お二人は何をしていますか？']
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

  //Setting up computer tree
  emptyNodeComp: TreenodeComputer = {
    name: '',
    video: '',
    leftChild: '',
    rightChild: ''
  }
  // nodeComp4: TreenodeComputer = {
  //   name: ' 私ははやとです。お二人は何をしていますか？',
  //   video: '',
  //   leftChild: '',
  //   rightChild: ''
  // }
  // nodeComp4: TreenodeComputer = {
  //   name: ' 私ははやとです。お二人は何をしていますか？',
  //   video: '',
  //   leftChild: '',
  //   rightChild: ''
  // }
  // nodeComp4: TreenodeComputer = {
  //   name: ' 私ははやとです。お二人は何をしていますか？',
  //   video: '',
  //   leftChild: '',
  //   rightChild: ''
  // }
  // nodeComp4: TreenodeComputer = {
  //   name: ' 私ははやとです。お二人は何をしていますか？',
  //   video: '',
  //   leftChild: '',
  //   rightChild: ''
  // }
  nodeComp8: TreenodeComputer = {
    name: ' 教会に行っている友達がいますが、そのことについてあまり話したことがありません。学んでみたいと思っていました。',
    video: '27,34',
    leftChild: '',
    rightChild: ''
  }
  nodeComp7: TreenodeComputer = {
    name: ' はい、聞いてみたいです。',
    video: '24,26',
    leftChild: '',
    rightChild: ''
  }
  nodeComp6: TreenodeComputer = {
    name: ' 素晴らしいですね。',
    video: '21,23',
    leftChild: '',
    rightChild: ''
  }
  nodeComp5: TreenodeComputer = {
    name: 'キリストについては学んだことないですね。',
    video: '17,20',
    leftChild: '',
    rightChild: ''
  }
  nodeComp4: TreenodeComputer = {
    name: ' 私ははやとです。お二人は何をしていますか？',
    video: '5,10',
    leftChild: '',
    rightChild: ''
  }
  nodeComp3: TreenodeComputer = {
    name: ' 私ははやとです。お二人は何をしていますか？',
    video: '5,10',
    leftChild: '',
    rightChild: ''
  }
  nodeComp2: TreenodeComputer = {
    name: 'そうなんですね。私はここに10年間住んでいます。何をしに引っ越してきたんですか？',
    video: '10,17',
    leftChild: this.nodeComp5,
    rightChild: this.nodeComp6
  }
  nodeComp1: TreenodeComputer = {
    name: '元気です。お名前は何ですか？',
    video: '2,5',
    leftChild: this.nodeComp3,
    rightChild: this.nodeComp4
  }

  parentNodeComp: TreenodeComputer = {
    name: 'こんにちは。元気ですか？',
    video: '0,2',
    leftChild: this.nodeComp1,
    rightChild: this.nodeComp2
  }
  //Setting up user tree
  emptyNode: Treenode = {
    name: '',
    leftChild: '',
    rightChild: ''
    }
  node14:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node13:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node12:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node11:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node10:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node9:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node8:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node7:Treenode = {
    name: '',
    leftChild: this.emptyNode,
    rightChild: this.emptyNode
  }
  node6:Treenode = {
    name: '私たちはボランティアとして奉仕するために来ました。 ',
    //name: 'hey what up',
    leftChild: this.node13,
    rightChild: this.node14
  }
  node5:Treenode = {
    name: '私たちは宣教師で、イエスキリストについて教えています。',
    //name: 'hey how are you',
    leftChild: this.node11,
    rightChild: this.node12
  }
  node4:Treenode = {
    name: ' 私は田中姉妹です。お名前は何ですか？',
    //name: 'hello what up',
    leftChild: this.node5,
    rightChild: this.node6
  }
  node3:Treenode = {
    name: '私は山田長老です。お名前は何ですか？',
    // name: 'hello how are you',
    leftChild: this.node5,
    rightChild: this.node6
  }
  node2:Treenode = {
    name: 'はい元気です。私たちは最近この近くに引っ越してきました。地元の方ですか？',
    // name: 'hey',
    leftChild: this.node5,
    rightChild: this.node6
  }
  node1:Treenode = {
    name: 'はい元気です。元気ですか？',
    // name: 'hello',
    leftChild: this.node3,
    rightChild: this.node4
  }

  //we are going to start at node1
  parentNode:Treenode = {
    name: '',
    leftChild: this.node1,
    rightChild: this.node2
  }

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
    this.computerSentence = this.parentNodeComp.name;
    this.choiceOne = this.parentNode.leftChild.name;
    this.choiceTwo = this.parentNode.rightChild.name;
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
      (change: any) => {this.voiceText = change; if(change !== undefined){this.userArray.push(change)}; this.onCheck(); if(change !== undefined){this.send(change)};}
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
        this.scoreLeft = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);
        this.scoreRight = this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
        this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo,this.voiceText));
      }
      else {this.score = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);
        this.scoreLeft = this.checkSentence.checkPercent(this.choiceOne,this.voiceText);
        this.score = this.scoreLeft;
      }
    }
    else if (this.choiceTwo !== ''){
      this.scoreRight = this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
      this.checkSentence.checkPercent(this.choiceTwo,this.voiceText);
      this.score = this.scoreRight;
    }

    // this.score = this.checkSentence.checkPercent(this.,this.voiceText);
    if(this.scoreLeft > .8){
      this.parentNodeComp = this.parentNodeComp.leftChild;
      this.parentNode = this.parentNode.leftChild;
      this.choiceOne = this.parentNode.leftChild.name;
      this.choiceTwo = this.parentNode.rightChild.name;
      this.computerSentence = this.parentNodeComp.name;

      // this.videoCount +=1;
      // this.sentenceCounter+=1;

      // this.userVoiceText = [];
      // this.recordAudio.clearText();
      this.videoUrl = this.videoBase + this.parentNodeComp.video;
      // this.videoUrl = this.videoBase + this.videoTimeJapanese[this.videoCount];
      // this.computerSentence = this.computerSentenceArrayTwo[this.sentenceCounter];
      // this.choiceOne = this.userChoiceOneArray[this.sentenceCounter];
      // this.choiceTwo = this.userChoiceOneArray[this.sentenceCounter+1];
    //   let audio = new Audio();
    //   audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    // audio.load();
    // audio.play();
    
    }
    else if(this.scoreRight > .8){
      this.parentNodeComp = this.parentNodeComp.rightChild;
      this.parentNode = this.parentNode.rightChild;
      this.choiceOne = this.parentNode.leftChild.name;
      this.choiceTwo = this.parentNode.rightChild.name;
      this.computerSentence = this.parentNodeComp.name;

      this.videoUrl = this.videoBase + this.parentNodeComp.video;
      //this.guideSentence = 'Try again :)'
    }

    console.log(this.checkSentence.checkPercent('私たちはボランティアとして奉仕するために来ました。', '私たちはボランティアとして奉仕するために来ました'));
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

  setUserArray(check: string, num: number){
    if(check === this.userVoiceText[num]){
      this.userArray[num] = this.voiceTextTrans[num];
    }
    else if(check === this.voiceTextTrans[num]){
      this.userArray[num] = this.userVoiceText[num];
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
    console.log(this.choiceOne,this.choiceTwo,this.voiceText,this.computerSentence);
    const googleObj: GoogleObj = {
      q: [this.choiceOne, this.choiceTwo, this.voiceText, this.computerSentence, this.inputString],
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
          this.voiceTextTrans.push(res.data.translations[4].translatedText.replace(/&#39;/g, "'"));
        }
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
