import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { RecordAudio } from 'src/app/services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../../models/solution';
import { OnePath, Treenode, TreenodeComputer } from '../../models/tree-node';
import { SolutionService } from '../../services/solution.service';
import { GoogletranslateService } from '../../services/googletranslate.service';
// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {AnimationController, ModalController, Animation} from "@ionic/angular"
import { NextSentenceService } from 'src/app/services/nextsentence.service';

@Component({
  selector: 'app-shadowread',
  templateUrl: './shadowread.page.html',
  styleUrls: ['./shadowread.page.scss'],
})
export class ShadowreadPage implements OnInit {
  value: any;
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

  
  sentenceCounter = 0; 

  //Where to start and stop video for each line 
  // videoTimeJapanese = ["0,2","3,5", "6,10", "10,17", "17,21", "21,23", "24,26", "27,34"];
  videoUrl: SafeResourceUrl;
  videoBase = "../../assets/videos/spanish.mp4#t=";
  videoCount = 0;

  //To know whether to show L1 or L2
  choiceOneTrans = false;
  choiceTwoTrans = false;
  choiceComputerTrans = false;
  choiceUserTrans = false;
  choiceOneTran = false;
  voiceTextTrans = [];
  userArray = [];

  langFrom = new FormControl('es');
  langTo = new FormControl('en');

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

  emptyNode: OnePath = {
    name: '',
    next: '',
    audio: ''
  }
  brownNode8: OnePath ={
    name: 'Le gustaria aprender mas acerca de nuesta religion?',
    next: this.emptyNode,
    audio: '../assets/soundFile/shadowread/le gustaria aprender mas.mp3'
  };
  brownNode7: OnePath ={
    name: 'Que sabe de la Iglesia?',
    next: this.brownNode8,
    audio:     '../assets/soundFile/shadowread/Que sabe de la iglesia.mp3'
  };
  brownNode6: OnePath ={
    name: 'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos do los Ultimos Dias?',
    next: this.brownNode7,
    audio: '../assets/soundFile/shadowread/somos misioneros.mp3'
  };
  brownNode5: OnePath ={
    name: 'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
    next: this.brownNode6,
    audio: '../assets/soundFile/shadowread/Tenemos dos hijos.mp3'
  };
  brownNode4: OnePath ={
    name: 'Tienen hijos?',
    next: this.brownNode5,
    audio: '../assets/soundFile/shadowread/Tienen hijos.mp3'
  };
  brownNode3: OnePath ={
    name: 'Como se llama su esposa?',
    next: this.brownNode4,
    audio: '../assets/soundFile/shadowread/Como se llama su esposa.mp3'
  };
  brownNode2: OnePath ={
    name: 'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
    next: this.brownNode3,
    audio: '../assets/soundFile/shadowread/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3'
  };
  brownNode1: OnePath ={
    name: 'Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
    next: this.brownNode2,
    audio: '../assets/soundFile/shadowread/Me llamo Benjamin Brown.mp3'
  };

  neighborNode7: OnePath ={
    name: 'No mucho, mi amigo habla poco de religion.',
    next: this.emptyNode,
    audio: '../assets/soundFile/shadowread/No mucho.mp3'
  };
  neighborNode6: OnePath ={
    name: 'Si. Uno de mis amigos es miembro de esa iglesia.',
    next: this.neighborNode7,
    audio: '../assets/soundFile/shadowread/si uno de mis amigos es miembro.mp3'
  };
  neighborNode5: OnePath ={
    name: 'Ustedes estan aqui por trabjo?',
    next: this.neighborNode6,
    audio: '../assets/soundFile/shadowread/estan aqui por trabajo.mp3'
  };
  neighborNode4: OnePath ={
    name: 'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
    next: this.neighborNode5,
    audio: '../assets/soundFile/shadowread/No, no tenemos hijos.mp3'
  };
  neighborNode3: OnePath ={
    name: 'Se llama Maria.',
    next: this.neighborNode4,
    audio: '../assets/soundFile/shadowread/Se llama Maria.mp3'
  };
  neighborNode2: OnePath ={
    name: 'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
    next: this.neighborNode3,
    audio: '../assets/soundFile/shadowread/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3',
  };
  neighborNode1: OnePath ={
    name: 'Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
    next: this.neighborNode2,
    audio: '../assets/soundFile/shadowread/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3'
  };

  parentNodeUser: OnePath ={
    name: '',
    next: '',
    audio: ''
  };
  
  parentNodeCom: OnePath ={
    name: '',
    next: '',
    audio: ''
  };

  cpImage ="../../../assets/icon/sammy.png"
  userImage ="../../../assets/icon/blank.webp"

  //store user choices and computer responce
  computerSentence: string = '';
  choiceOne: string = '';
  choiceTwo: string = '';

  constructor(private animationCtrl: AnimationController, private nextSentence: NextSentenceService, private modalCtrl: ModalController, private google: GoogletranslateService , private solution: SolutionService, private recordAudio: RecordAudio, private checkSentence: CheckSentence) {
    
    this.videoUrl = this.videoBase + 6;

    this.showAccuracy = true;
    this.langSwitch = true;
    // this.computerSentence = this.parentNode.name;
    // this.choiceOne = this.parentNode.leftChild.name;
    // this.choiceTwo = this.parentNode.rightChild.name;
  }
  
  // startLoad(){
  //   const animation = this.animationCtrl.create('change-color')
  //     .addElement(this.changeColor.nativeElement)
  //     .duration(3000)
  //     .iterations(Infinity)
  //     .keyframes([
  //       {offset: 0, opacity: '1'
  //     },{
  //       offset: .25, opacity: '.75'
  //     }, {
  //       offset: .5, opacity: '.5'
  //     },
  //     {
  //       offset: .75, opacity: '.75'
  //     },
  //     {
  //       offset: 1, opacity: '1'
  //     }
  //     ]);
  //     animation.play();
  // }

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

  //pick which who you want to roleplay as 
  chooseRoleplay(event){
    console.log(event.detail.value);
    this.value = event.detail.value;
    if(event.detail.value === '1'){
      this.parentNodeUser = this.brownNode1;
      this.choiceOne = this.parentNodeUser.name;
      this.computerSentence = '';
      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      this.userTextCorrect = '';
      this.userTextCorrectTrans = '';
      this.cpImage ="../../../assets/icon/neighbor.jpg"
      this.userImage ="../../../assets/icon/blank.webp"
    }
    else if(event.detail.value === '2'){
      this.parentNodeUser = this.neighborNode1;
      this.parentNodeCom = this.brownNode1;
      this.choiceOne = this.parentNodeUser.name;
      this.computerSentence = this.parentNodeCom.name;
      this.onListenToSentence(3);
      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      this.userTextCorrect = '';
      this.userTextCorrectTrans = '';
      this.cpImage ="../../../assets/icon/blank.webp"
      this.userImage ="../../../assets/icon/neighbor.jpg"
    }
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
    if(this.scoreLeft >= .7){
      if(this.value === "1"){
        this.parentNodeCom = this.neighborNode1;
        this.value = 0;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = this.parentNodeUser.name;
        this.computerSentence = this.parentNodeCom.name;
        this.onListenToSentence(3);
      }
      else{
        this.parentNodeCom = this.parentNodeCom.next;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = this.parentNodeUser.name;
        this.computerSentence = this.parentNodeCom.name;
        this.onListenToSentence(3);
      }
      

      this.userTextCorrect = this.voiceText;
      // this.userTextCorrect = this.userVoiceText[this.userArray.length];
      // this.userTextCorrectTrans = this.voiceTextTrans[0];
      // this.userTextCorrectAudio = this.userVoiceArray[this.userArray.length];
      // this.userTextCorrect = this.voiceText;
      // console.log(this.userVoiceArray)
      this.recordAudio.userVoiceText = [];
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];

      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      // this.videoUrl = this.videoBase + this.parentNode.video;
    
    }
    else if(this.scoreRight >= .7){
      if(this.value === "1"){
        this.parentNodeCom = this.neighborNode1;
        this.value = 0;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = this.parentNodeUser.name;
        this.computerSentence = this.parentNodeCom.name;
        this.onListenToSentence(3);
      }
      else{
        this.parentNodeCom = this.parentNodeCom.next;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = this.parentNodeUser.name;
        this.computerSentence = this.parentNodeCom.name;
        this.onListenToSentence(3);
      }
      // this.choiceTwo = this.parentNode.rightChild.name;
      this.computerSentence = this.parentNodeCom.name;
      this.userTextCorrect = this.voiceText;
      this.recordAudio.userVoiceText = [];
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];

      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      
      // this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
      // this.userTextCorrectAudio = this.userVoiceArray[this.userArray.length];
      // this.userArray = [];
      // this.userVoiceArray = [];
      // this.userVoiceText = [];
      // this.videoUrl = this.videoBase + this.parentNode.video;
      //this.guideSentence = 'Try again :)'
    }

  }

  onListenToSentence(num: number){
    //1 is left, two is right
    if(num === 1){
      // console.log(this.parentNode.leftChild.audio)
      this.audio.pause();
      this.audio.src = this.parentNodeUser.audio;
      this.audio.load();
      this.audio.play();
    }
    else if(num === 2){
      this.audio.pause();
      // this.audio.src = this.parentNode.rightChild.audio;
      this.audio.load();
      this.audio.play();
    }
    else if(num === 3){
      this.audio.pause();
      this.audio.src = this.parentNodeCom.audio;
      this.audio.load();
      this.audio.play();
      // this.audio.onended(this.onStopListening())
      // setTimeout(()=> (this.onStopListening(),this.audio.duration));
    }
  }

  //Replay video -- not working because the source remains the same
  onReplayVideo(){
    // this.videoUrl = this.videoBase + this.parentNode.video;
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
    if(num >= 0 && num != 99){
      this.audio.pause();
      console.log(num);
      this.audio.src = this.userVoiceArray[num];
      this.audio.load();
      this.audio.play();
    }
    else if(num === 99){
      
      console.log(num);
      this.audio.src = this.userVoiceArray[0];
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
    if(num >= 0 && num != 99){
      this.audio.pause();
      console.log(num);
      this.audio.src = this.userVoiceArray[num+1];
      this.audio.load();
      this.audio.play();
    }
    else if(num === 99){
      
        console.log(num);
        this.audio.src = this.userVoiceArray[0];
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

