import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { RecordAudio } from '../../services/recordaudio.service';
import { FormControl } from '@angular/forms';
import { GoogleObj, Solution } from '../../models/solution';
import { OnePath } from '../../models/tree-node';
import { SolutionService } from '../../services/solution.service';
import { GoogletranslateService } from '../../services/googletranslate.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NextSentenceService } from '../../services/nextsentence.service';

@Component({
  selector: 'app-shadowread',
  templateUrl: './shadowread.page.html',
  styleUrls: ['./shadowread.page.scss'],
})
export class ShadowPage implements OnInit {
  value: any;
  //To record voice 
  public userVoiceText = [];
  public voiceActiveSectionDisabled: boolean = true;
  public voiceActiveSectionError: boolean = false;
  public voiceActiveSectionSuccess: boolean = false;
  public voiceActiveSectionListening: boolean = false;
  public voiceText: any = '';
  public voiceTextReady: boolean = false;
  public inputString = '';
  public userVoice: any = '';
  public userVoiceArray = [];
  public notPlaying = true;
  public audio = new Audio();
  public userTextCorrect = "";
  public userTextCorrectAudio = "";
  public userTextCorrectTrans = '';
  public showVoiceText = false;
  public showVoiceText2 = false;
  public previousSentence;
  public sentenceCounter = 0;
  public currentUserRecord;
  public computerVoiceArray = [];
  public conversationLog = [];
  public computerTextTrans;
  public showComputerSentence: boolean;
  public listeningElement;
  public audioIcon = ["play-outline", "play-outline", "play-outline"];
  public audioIconArray = [];
  public fullConversation = [];
  //Where to start and stop video for each line 
  public videoUrl: SafeResourceUrl;
  public videoBase = "../../assets/videos/spanish.mp4#t=";
  public videoCount = 0;
  //To know whether to show L1 or L2
  public choiceOneTrans = false;
  public choiceTwoTrans = false;
  public choiceComputerTrans = false;
  public choiceUserTrans = false;
  public choiceOneTran = false;
  public voiceTextTrans = [];
  public userArray = [];
  public langFrom = new FormControl('es');
  public langTo = new FormControl('en');
  private translateBtn: any;
  public scoreLeft: number = 0;
  public scoreRight: number = 0;
  public score: number = 0;
  //Highlight missed words
  public correctOrNot: number;
  public correctOrNotArray = [{ boolean: false, chunk: '' }];
  public correctOrNotBoolean: boolean;
  public noSymbolSentence: string;
  public wrongAnswer = false;
  public wrongAnswer1 = false;
  public wrongAnswer2 = false;
  public chunkSentence = [];
  public chunkComponent = '';
  public chunkCheck: string;
  public noSpace = false;
  //Japanese tree
  public computerSentenceArray = [];
  public showAccuracy: boolean;
  public langSwitch: boolean;
  //stores the translations
  public data: Solution = {
    firstChoice: '',
    secondChoice: '',
    userText: '',
    computerText: '',
    inputString: ''
  };
  public emptyNode: OnePath = {
    name: '',
    next: '',
    audio: ''
  }
  brownNode8: OnePath = {
    name: 'Le gustaria aprender mas acerca de nuesta religion?',
    next: this.emptyNode,
    audio: '../assets/soundFile/shadowread/le gustaria aprender mas.mp3'
  };
  brownNode7: OnePath = {
    name: 'Que sabe de la Iglesia?',
    next: this.brownNode8,
    audio: '../assets/soundFile/shadowread/Que sabe de la iglesia.mp3'
  };
  brownNode6: OnePath = {
    name: 'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos de los Ultimos Dias?',
    next: this.brownNode7,
    audio: '../assets/soundFile/shadowread/somos misioneros.mp3'
  };
  brownNode5: OnePath = {
    name: 'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
    next: this.brownNode6,
    audio: '../assets/soundFile/shadowread/Tenemos dos hijos.mp3'
  };
  brownNode4: OnePath = {
    name: 'Tienen hijos?',
    next: this.brownNode5,
    audio: '../assets/soundFile/shadowread/Tienen hijos.mp3'
  };
  brownNode3: OnePath = {
    name: 'Como se llama su esposa?',
    next: this.brownNode4,
    audio: '../assets/soundFile/shadowread/Como se llama su esposa.mp3'
  };
  brownNode2: OnePath = {
    name: 'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
    next: this.brownNode3,
    audio: '../assets/soundFile/shadowread/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3'
  };
  brownNode1: OnePath = {
    name: 'Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
    next: this.brownNode2,
    audio: '../assets/soundFile/shadowread/Me llamo Benjamin Brown.mp3'
  };

  neighborNode7: OnePath = {
    name: 'No mucho, mi amigo habla poco de religion.',
    next: this.emptyNode,
    audio: '../assets/soundFile/shadowread/No mucho.mp3'
  };
  neighborNode6: OnePath = {
    name: 'Si. Uno de mis amigos es miembro de esa iglesia.',
    next: this.neighborNode7,
    audio: '../assets/soundFile/shadowread/si uno de mis amigos es miembro.mp3'
  };
  neighborNode5: OnePath = {
    name: 'Ustedes estan aqui por trabjo?',
    next: this.neighborNode6,
    audio: '../assets/soundFile/shadowread/estan aqui por trabajo.mp3'
  };
  neighborNode4: OnePath = {
    name: 'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
    next: this.neighborNode5,
    audio: '../assets/soundFile/shadowread/No, no tenemos hijos.mp3'
  };
  neighborNode3: OnePath = {
    name: 'Se llama Maria.',
    next: this.neighborNode4,
    audio: '../assets/soundFile/shadowread/Se llama Maria.mp3'
  };
  neighborNode2: OnePath = {
    name: 'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
    next: this.neighborNode3,
    audio: '../assets/soundFile/shadowread/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3',
  };
  neighborNode1: OnePath = {
    name: 'Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
    next: this.neighborNode2,
    audio: '../assets/soundFile/shadowread/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3'
  };
  parentNodeUser: OnePath = {
    name: '',
    next: '',
    audio: ''
  };
  parentNodeCom: OnePath = {
    name: '',
    next: '',
    audio: ''
  };
  public cpImage = "../../../assets/icon/sammy.png"
  public userImage = "../../../assets/icon/blank.webp"
  //store user choices and computer responce
  public computerSentence: string = '';
  public choiceOne: string = '';
  public choiceTwo: string = '';

  constructor(
    private cd: ChangeDetectorRef, 
    private nextSentence: NextSentenceService, 
    private google: GoogletranslateService, 
    private solution: SolutionService, 
    private recordAudio: RecordAudio, 
    private checkSentence: CheckSentence) {
      this.videoUrl = this.videoBase + 6;
      this.showAccuracy = true;
      this.langSwitch = true;
  }

  ngOnInit() {
    if (this.choiceOne === '') {
      this.audio.addEventListener("ended", () => {
        this.choiceOne = this.parentNodeUser.name;
        this.cd.detectChanges();
      });
    }
    this.audio.addEventListener("ended", () => {
      for (var i = 0; i < this.audioIcon.length; i++) {
        this.audioIcon[i] = "play-outline";
      }
      for (let i = 0; i < this.audioIconArray.length; i++) {
        this.audioIconArray[i].computer = 'play-outline';
        this.audioIconArray[i].player = 'play-outline';
      }
    });
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
    this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionDisabled = change
    );
    this.recordAudio.userVoiceTextChanged.subscribe(
      (change: any[]) => { this.userVoiceText = change }
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
      (change: any) => {
        this.voiceText = change;
        if (change !== undefined) { this.send(change) }; this.onCheck()
      });
    this.recordAudio.userAudioChanged.subscribe(
      (change: any) => {
        this.userVoice = change;
        if (this.score >= .8) { this.userVoiceArray.push(change) };
      }
    );
    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
    this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
    this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
    this.voiceActiveSectionListening = this.voiceActiveSectionListening;
    this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.checkSentence.updateSentences(this.choiceOne, this.choiceTwo, this.voiceText);
    this.sentenceCounter = this.nextSentence.nextSentence;
  }

  onStartVoiceRecognition() {
    this.showVoiceText = true;
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
  }

  //pick which who you want to roleplay as 
  chooseRoleplay(event) {
    this.value = event.detail.value;
    if (event.detail.value === '1') {
      this.parentNodeUser = this.brownNode1;
      this.choiceOne = this.parentNodeUser.name;
      this.computerSentence = '';
      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      this.computerVoiceArray = [];
      this.userTextCorrect = '';
      this.userTextCorrectTrans = '';
      this.conversationLog = [];
      this.voiceText = '';
      this.cpImage = "../../../assets/icon/neighbor.jpg"
      this.userImage = "../../../assets/icon/missionary-couple.jpg"
    }
    else if (event.detail.value === '2') {
      this.parentNodeUser = this.neighborNode1;
      this.parentNodeCom = this.brownNode1;
      this.choiceOne = this.parentNodeUser.name;
      this.computerSentence = this.parentNodeCom.name;
      this.onListenToSentence(2);
      this.computerVoiceArray = [];
      this.computerVoiceArray.push(this.parentNodeCom.audio)
      this.userArray = [];
      this.userVoiceArray = [];
      this.userVoiceText = [];
      this.voiceTextTrans = [];
      this.userTextCorrect = '';
      this.userTextCorrectTrans = '';
      this.conversationLog = [];
      this.cpImage = "../../../assets/icon/missionary-couple.jpg"
      this.userImage = "../../../assets/icon/neighbor.jpg"
    }
  }

  onCloseVoiceRecognition() {
    this.showVoiceText = false;
    this.recordAudio.closeVoiceRecognition();
  }

  onCheck() {
    if (this.voiceText === undefined) {
      return;
    }
    this.correctOrNotArray = [];
    this.showAccuracy = !this.showAccuracy;
    if (this.choiceOne !== '') {
      this.score = this.checkSentence.checkPercent(this.choiceOne, this.voiceText);
    }
    this.chunkSentence = this.choiceOne.split(' ');
    for (let chunk of this.chunkSentence) {
      this.correctOrNot = this.voiceText.toLowerCase().indexOf(chunk.toLowerCase());
      if (this.correctOrNot == -1) {
        this.chunkCheck = chunk.replace(/[¡.,\/#!$%\^&?\*;:{}=\-_`~()。、？¿！]/g, "");
        this.correctOrNot = this.voiceText.toLowerCase().indexOf(this.chunkCheck.toLowerCase())
        if (this.correctOrNot != -1) {
          this.correctOrNotBoolean = true;
        }
        else {
          this.correctOrNotBoolean = false;
        }
        this.correctOrNotArray.push({
          boolean: this.correctOrNotBoolean,
          chunk: chunk
        });
      }
      else {
        this.correctOrNotBoolean = true;
        this.correctOrNotArray.push({
          boolean: this.correctOrNotBoolean,
          chunk: chunk
        });
      }
    }
    this.wrongAnswer = true;
    this.wrongAnswer1 = true;
    this.wrongAnswer2 = false;
    if (this.score >= .8) {
      this.voiceText = this.parentNodeUser.name;
      this.conversationLog.push({
        computer: this.computerSentence,
        player: this.voiceText
      });
      this.audioIconArray.push({
        computer: 'play-outline',
        player: 'play-outline'
      })
      this.userArray.push({
        computer: this.computerSentence,
        player: this.voiceText
      });
      if (this.computerVoiceArray.length < this.userArray.length) {
        this.computerVoiceArray.push(this.parentNodeCom.audio)
      }
      if (this.value === "1") {
        this.parentNodeCom = this.neighborNode1;
        this.value = 0;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = '';
        this.computerSentence = "...";
        setTimeout(() => {
          this.computerSentence = this.parentNodeCom.name;
          this.onListenToSentence(2);
          this.cd.detectChanges();
        }, 1500);
      }
      else {
        this.parentNodeCom = this.parentNodeCom.next;
        this.parentNodeUser = this.parentNodeUser.next;
        this.choiceOne = '';
        this.computerSentence = "...";
        setTimeout(() => {
          this.computerSentence = this.parentNodeCom.name;
          this.onListenToSentence(2);
          this.cd.detectChanges();
        }, 1500);
      }
      this.userTextCorrect = this.voiceText;
      this.showVoiceText2 = false;
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
      this.wrongAnswer = false;
      this.wrongAnswer1 = false;
      this.wrongAnswer2 = false;
    }
    else {
      this.currentUserRecord = this.userVoice;
      this.showVoiceText2 = true;
    }
    this.showVoiceText = false;
    this.showVoiceText2 = false;
  }

  onListenToSentence(num: number) {
    //1 is userChoice, two is most recent computer sentence
    if (num === 1) {
      if (this.audioIcon[0] === "stop-outline") {
        this.audioIcon[0] = "play-outline";
        this.audio.pause();
      }
      else {
        this.audioIcon[0] = "stop-outline"
        this.audioIcon[1] = "play-outline"
        this.audio.pause();
        this.audio.src = this.parentNodeUser.audio;
        this.audio.load();
        this.audio.play();
      }
    }
    else if (num === 2) {
      if (this.audioIcon[1] === "stop-outline") {
        this.audioIcon[1] = "play-outline";
        this.audio.pause();
      }
      else {
        this.audio.pause();
        this.audio.src = this.parentNodeCom.audio;
        this.audio.load();
        this.audio.play();
        this.audioIcon[1] = "stop-outline"
        this.audioIcon[0] = "play-outline";
      }
    }
  }

  onStopListening() {
    this.audio.pause();
    this.notPlaying = !this.notPlaying;
  }

  onListenAgain() {
    let audio = new Audio();
    audio.load();
    audio.play();
  }

  playAudio(num, user) {
    if (user === 'player') {
      if (num === 'current') {
        this.audio.pause();
        this.audio.src = this.userVoice;
        this.audio.load();
        this.audio.play();
      }
      else {
        if (this.audioIconArray[num].player === 'stop-outline') {
          this.audio.pause();
          this.audioIconArray[num].player = 'play-outline';
        }
        else {
          for (let i = 0; i < this.audioIconArray.length; i++) {
            this.audioIconArray[i].computer = 'play-outline';
            this.audioIconArray[i].player = 'play-outline';
          }
          this.audioIconArray[num].player = 'stop-outline';
          this.audio.pause();
          this.audio.src = this.userVoiceArray[num];
          this.audio.load();
          this.audio.play();
        }
      }
    }
    else if (user === 'computer') {
      if (this.audioIconArray[num].computer === 'stop-outline') {
        this.audio.pause();
        this.audioIconArray[num].computer = 'play-outline';
      }
      else {
        for (let i = 0; i < this.audioIconArray.length; i++) {
          this.audioIconArray[i].computer = 'play-outline';
          this.audioIconArray[i].player = 'play-outline';
        }
        this.audioIconArray[num].computer = 'stop-outline';
        this.audio.pause();
        this.audio.src = this.computerVoiceArray[num];
        this.audio.load();
        this.audio.play();
      }
    }
  }

  setUserArray(check: string, num: number) {
    if (check === this.userArray[num].player) {
      this.conversationLog[num].player = this.voiceTextTrans[num].player;
    }
    else if (check === this.userArray[num].computer) {
      this.conversationLog[num].computer = this.voiceTextTrans[num].computer;
    }
    else if (check === this.voiceTextTrans[num].player) {
      this.conversationLog[num].player = this.userArray[num].player;
    }
    else if (check === this.voiceTextTrans[num].computer) {
      this.conversationLog[num].computer = this.userArray[num].computer;
    }
  }

  //Sends sentences to Google translate 
  send(paragraphSel: string) {
    if (paragraphSel === 'choiceOne') {
      this.choiceOneTran = !this.choiceOneTran;
    }
    if (paragraphSel === 'choiceTwo') {
      this.choiceTwoTrans = !this.choiceTwoTrans;
    }
    if (paragraphSel === 'computerText') {
      this.choiceComputerTrans = !this.choiceComputerTrans;
    }
    if (paragraphSel === 'userText') {
      this.choiceUserTrans = !this.choiceUserTrans;
    }
    if (this.voiceText === undefined) {
      this.voiceText = '';
    }
    if (paragraphSel !== 'userText' && paragraphSel !== 'choiceOne' && paragraphSel !== '' && paragraphSel !== 'computerText' && paragraphSel !== 'choiceTwo') {
      this.inputString = paragraphSel;
    }
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
        this.userTextCorrectTrans = this.data.userText;
        this.computerTextTrans = this.data.computerText;
        if (this.score >= .8) {
          if (this.voiceTextTrans.length < this.userArray.length) {
            this.voiceTextTrans.push({
              computer: this.data.computerText,
              player: this.userTextCorrectTrans
            });
          }
        }
      },
      err => {
        console.error(err);
      }
    );
    this.userTextCorrectTrans = this.voiceTextTrans[0];
  }

  playFullActivity() {
    //first choice
    if (this.value === 0) {
      var count = 0;
      if (this.conversationLog) {
        for (var i = 0; i < this.conversationLog.length; i++) {
          if (i === 0) {
            this.fullConversation[i] = this.userVoiceArray[i]; //0,0
            this.fullConversation[i + 1] = this.computerVoiceArray[i + 1]; //1,0
          }
          else {
            i += 1;
            this.fullConversation[i] = this.userVoiceArray[i - 1];
            this.fullConversation[i + 1] = this.computerVoiceArray[i];
          }
          var count = i;
        }
        this.fullConversation[count + 1] = this.parentNodeCom.audio;
      }
    }
    //second choice 
    else if (this.value === 2) {
      this.fullConversation[0]
    }
  }

  //Changes if it is using L1 or L2
  onSwitch() {
    this.langSwitch = !this.langSwitch;
  }
}