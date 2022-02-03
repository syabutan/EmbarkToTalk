import { AfterContentChecked, ChangeDetectorRef, Component,  NgZone,  OnInit } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { FormControl } from '@angular/forms';
import { GoogleObj } from '../../models/solution';
import { GoogletranslateService } from '../../services/googletranslate.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RecordAudio } from '../../services/recordaudio.service';
import { SpanishService } from '../../services/lessons/spanish.service';

@Component({
  selector: 'app-spanish',
  templateUrl: './spanish.page.html',
  styleUrls: ['./spanish.page.scss'],
  host: {
    class: "container container--home"
  }
})

export class SpanishPage implements OnInit, AfterContentChecked {
  //To record voice
  public userVoiceText = [];
  public voiceActiveSectionDisabled = true;
  public voiceActiveSectionError = false;
  public voiceActiveSectionSuccess = false;
  public voiceActiveSectionListening = false;
  public voiceText: any = '';
  public voiceTextReady = false;
  public userVoice: any = '';
  public userVoiceArray = [];
  public correctRecord = [];
  public correctVoiceRecord = [];
  public notPlaying = true;
  public audio = new Audio();
  public userTextCorrect = "";
  public userTextCorrectAudio = "";
  public userTextCorrectTrans = '';
  public sentenceNum = 1;
  public lessonCompleted = false;
  //Where to start and stop video for each line
  public videoUrl: SafeResourceUrl;
  public videoBase = '';
  public videoCount = 0;
  public audioBase = "../../../../assets/soundFile/japanese/";
  //To know whether to show L1 or L2
  public choiceOneTrans = false;
  public choiceTwoTrans = false;
  public choiceComputerTrans = false;
  public choiceUserTrans = false;
  public choiceOneTran = false;
  public voiceTextTrans = [];
  public textTran = false;
  public computerLogTrans = false;
  public userArray = [];
  public userLangFrom: string;
  public userLangTo: string;
  public langFrom = new FormControl('es');
  public langTo = new FormControl('en');
  public langArray;
  public scoreLeft: number = 0;
  public scoreRight: number = 0;
  public score: number = 0;
  //Japanese tree
  public computerSentenceArray = [];
  public showAccuracy: boolean;
  public langSwitch: boolean;
  //stores the translations
  public firstChoice: string;
  public secondChoice: string;
  public voiceTextTran: string;
  public computerSentenceTran: string;
  public serviceArray;
  public refArray;
  public cpImage = '';
  public userImage ="../../assets/icon/blank.webp"
  //store user choices and computer responce
  public computerSentence = '';
  public choiceOne;
  public choiceTwo;
  public logNum = 0;
  public showVoiceText: boolean;
  public showVoiceText2: boolean;
  public correctOrNot: number;
  public correctOrNotArray = [{boolean: false, chunk: ''}];
  public correctOrNotBoolean: boolean;
  public conversationLog = [{
    computer: '',
    player: '',
    computerTran: false,
    playerTran: false,
    sentenceNumber: 0,
    computerIcon: 'play-outline',
    playerIcon: 'play-outline'
  }];
  public noSymbolSentence: string;
  public wrongAnswer = false;
  public wrongAnswer1 = false;
  public wrongAnswer2 = false;
  public firstPrompt = true;
  public chunkSentence = [];
  public chunkComponent = '';
  public chunkCheck: string;
  public hiragana = /[\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
  public katakana = /[\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu;
  public kanji = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
  public whichCharacter = '';
  public previousWhichCharacter = '';
  public noSpace = false;
  public oneIsChosen = false;
  public sentence: string;
  public logPlayerTran: string;
  public logComputerTran: string;
  public choiceOneTranWrong = false;
  public choiceTwoTransWrong = false;
  public tranHold = false;
  public startConversation: boolean;
  public startButton = 'START CONVERSATION';
  public againButton = 'RESTART';
  public missCount = 0;
  public audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
  public speaking = true;
  public goodCounter = 0;

  constructor(
    private google: GoogletranslateService ,
    private recordAudio: RecordAudio,
    private checkSentence: CheckSentence,
    private spaservice: SpanishService,
    private cdref: ChangeDetectorRef,
    private _ngzone: NgZone) {
      this.conversationLog = [];
      this.showAccuracy = true;
      this.langSwitch = true;
      this.showVoiceText = false;
      this.showVoiceText2 = false;
      this.startConversation = true;
  }

  ngOnInit() {
    localStorage.setItem('userLangFrom', 'es');
    this.refArray = this.spaservice.getAllRef();
    this.serviceArray = this.spaservice.getAllArrays();
    this.videoBase = this.refArray[0].videoRef;
    this.audioBase = this.refArray[0].voiceRef;
    this.cpImage = this.refArray[0].faceIcon;
    this.choiceOne = this.serviceArray[2];
    this.choiceTwo = this.serviceArray[3];
    this.computerSentence = this.serviceArray[1].computer;
    this.videoUrl = this.videoBase + this.serviceArray[1].video;
    this.audio.addEventListener("ended", () => {
      this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
      this.conversationLog.forEach(element => {
        element.computerIcon = 'play-outline';
        element.playerIcon = 'play-outline';
      })
    });
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
      (change: any) => {this.voiceText = change; if(change !== undefined) {this.userArray.push(change)}; if(change !== undefined) {this.send(change)}; this.onCheck();}
    );
    this.recordAudio.userAudioChanged.subscribe(
      (change: any) => {this.userVoice = change;
        this.userVoiceArray.push(change);
        this.correctVoiceRecord.push(change);
      });
    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
  	this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
  	this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
  	this.voiceActiveSectionListening = this.voiceActiveSectionListening;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.checkSentence.updateSentences(this.choiceOne.player,this.choiceTwo.player, this.voiceText);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onStart() {
    this.startConversation = false;
    let videoRange = this.serviceArray[1].video;
    let videoList = videoRange.split(',')
    let videoSeconds = (parseInt(videoList[1])-parseInt(videoList[0]));
    this.speaking = true;
    this.computerSentence = this.serviceArray[1].computer;
    setTimeout(() => {
      this._ngzone.run(() => {
        this.speaking = false;
      })
    }, videoSeconds*1200)
  }

  onStartVoiceRecognition() {
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
    this.showVoiceText = true;
    this.showVoiceText2 = false;
  }

  onCloseVoiceRecognition() {
    this.recordAudio.closeVoiceRecognition();
    this.showVoiceText = false;
  }

  onCheck() {
    this.showVoiceText = true;
    if(this.voiceText === undefined) {
      return;
    }
    this.correctOrNotArray = [];
    this.showAccuracy = !this.showAccuracy;
    this.scoreLeft = this.checkSentence.checkPercent(this.choiceOne.player,this.voiceText);
    this.scoreRight = this.checkSentence.checkPercent(this.choiceTwo.player,this.voiceText);
    this.score =  Math.max(this.checkSentence.checkPercent(this.choiceOne.player,this.voiceText), this.checkSentence.checkPercent(this.choiceTwo.player,this.voiceText));
    //Highlight missed words
    if (this.scoreRight <= this.scoreLeft) {
      this.oneIsChosen = true;
      this.chunkSentence = this.choiceOne.player.split(' ');
      for (let chunk of this.chunkSentence) {
        this.correctOrNot = this.voiceText.toLowerCase().indexOf(chunk.toLowerCase());
        if (this.correctOrNot === -1)
        {
          this.chunkCheck = chunk.replace(/[¡.,\/#!$%\^&?\*;:{}=\-_`~()。、？¿！]/g,"");
          this.correctOrNot = this.voiceText.toLowerCase().indexOf(this.chunkCheck.toLowerCase())
          if ( this.correctOrNot != -1) {
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
    }
    else if (this.scoreRight > this.scoreLeft) {
      this.oneIsChosen = false;
      this.chunkSentence = this.choiceTwo.player.split(' ');
      for (let chunk of this.chunkSentence) {
        this.correctOrNot = this.voiceText.toLowerCase().indexOf(chunk.toLowerCase());
        if (this.correctOrNot === -1) {
          this.chunkCheck = chunk.replace(/[¡.,\/#!$%\^&?\*;:{}=\-_`~()。、？¿！]/g,"");
          this.correctOrNot = this.voiceText.toLowerCase().indexOf(this.chunkCheck.toLowerCase())
          if ( this.correctOrNot != -1) {
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
      this.wrongAnswer1 = false;
      this.wrongAnswer2 = true;
    }
    if(this.scoreLeft >= .7) {
      this.sentenceNum = parseInt(this.choiceOne.id);
      this.conversationLog.push({
        computer: this.serviceArray[this.sentenceNum/2].computer,
        player: this.voiceText,
        computerTran: false,
        playerTran: false,
        sentenceNumber: this.sentenceNum/2,
        computerIcon: 'play-outline',
        playerIcon: 'play-outline'
      });
      this.logNum += 1;
      this.voiceText = '...';
      this.showVoiceText2 = false;
      this.wrongAnswer = false;
      this.wrongAnswer1 = false;
      this.wrongAnswer2 = false;
      this.choiceOneTranWrong = false;
      this.choiceTwoTransWrong = false;
      this.firstPrompt = false;
      this.goodCounter += 1;
      this.speaking = true;
      this.correctRecord.push(true);
    }
    else if(this.scoreRight >= .7) {
      this.sentenceNum = parseInt(this.choiceTwo.id);
      this.conversationLog.push({
        computer: this.serviceArray[(this.sentenceNum-1)/2].computer,
        player: this.voiceText,
        computerTran: false,
        playerTran: false,
        sentenceNumber: (this.sentenceNum-1)/2,
        computerIcon: 'play-outline',
        playerIcon: 'play-outline'
      });
      this.logNum += 1;
      this.voiceText = '...';
      this.showVoiceText2 = false;
      this.wrongAnswer = false;
      this.wrongAnswer1 = false;
      this.wrongAnswer2 = false;
      this.choiceOneTranWrong = false;
      this.choiceTwoTransWrong = false;
      this.firstPrompt = false;
      this.goodCounter += 1;
      this.speaking = true;
      this.correctRecord.push(true);
    }
    if ((this.sentenceNum * 2) >= this.serviceArray.length) {
      this.voiceText = '...';
      this.lessonCompleted = true;
    }
    this.choiceOne = this.serviceArray[(this.sentenceNum * 2)];
    this.choiceTwo = this.serviceArray[(this.sentenceNum * 2) + 1];
    this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;
    if (!this.wrongAnswer) {
      let videoRange = this.serviceArray[this.sentenceNum].video;
      let videoList = videoRange.split(',')
      let videoSeconds = (parseInt(videoList[1])-parseInt(videoList[0]));
      this.computerSentence = this.serviceArray[this.sentenceNum].computer;
      setTimeout(() => {
        this._ngzone.run(() => {
          this.speaking = false;
        })
      }, videoSeconds*1200)
      this.userTextCorrect = this.voiceText;
      this.recordAudio.userVoiceText = [];
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
    }
    if (this.goodCounter >= 6) {
      this.lessonCompleted = true;
    }
    this.showVoiceText = false;
    this.showVoiceText2 = false;
    this.send(undefined);
    if(this.scoreRight < .7 && this.scoreLeft < .7) {
      this.showVoiceText = true;
      this.showVoiceText2 = true;
      this.missCount++;
      this.correctRecord.push(false);
    }
  }

  onListenToSentence(num: number) {
    //1 is left, two is right
    if(num === 1) {
      if (this.audioIcon[0] === 'stop-outline') {
        this.audioIcon[0] = 'play-outline';
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[0] = 'stop-outline';
        this.audio.pause();
        this.audio.src = this.audioBase + (this.serviceArray[this.sentenceNum * 2].voicePlayer) + ".mp3";
        this.audio.load();
        this.audio.play();
      }
    }
    else if(num === 2) {
      if (this.audioIcon[1] === 'stop-outline') {
        this.audioIcon[1] = 'play-outline';
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[1] = 'stop-outline';
        this.audio.pause();
        this.audio.src = this.audioBase + (this.serviceArray[this.sentenceNum * 2 + 1].voicePlayer) + ".mp3";
        this.audio.load();
        this.audio.play();
      }
    }
    else if(num === 3) {
      if (this.audioIcon[2] === 'stop-outline') {
        this.audioIcon[2] = 'play-outline';
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[2] = 'stop-outline';
        this.audio.pause();
        this.audio.src = this.audioBase + (this.serviceArray[this.sentenceNum].voiceComputer) + ".mp3";
        this.audio.load();
        this.audio.play();
      }
    }
  }

  onListenToLog (num: number) {
    const id = this.conversationLog[num].sentenceNumber;
    if (this.conversationLog[num].computerIcon === 'stop-outline') {
      this.conversationLog[num].computerIcon = 'play-outline';
      this.audio.pause();
    }
    else {
      this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
      for (var i= 0; i < this.conversationLog.length; i++) {
        this.conversationLog[i].computerIcon = 'play-outline';
        this.conversationLog[i].playerIcon = 'play-outline';
      }
      this.conversationLog[num].computerIcon = 'stop-outline';
      this.audio.src = this.audioBase + this.serviceArray[id].voiceComputer + ".mp3";
      this.audio.pause();
      this.audio.load();
      this.audio.play();
    }
  }

  playUserAudio(num) {
    if (num === 99) {
      if (this.audioIcon[3] === 'stop-outline') {
        this.audioIcon[3] = 'play-outline';
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[3] = 'stop-outline';
        this.audio.pause();
        this.audio.src = this.userVoiceArray[this.userVoiceArray.length-1];
        this.audio.load();
        this.audio.play();
      }
    }
    else {
      if (this.conversationLog[num].playerIcon === 'stop-outline') {
        this.conversationLog[num].playerIcon = 'play-outline';
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.conversationLog[num].playerIcon = 'stop-outline';
        this.audio.pause();
        for (var i = this.userVoiceArray.length-1; i >= 0; i--) {
          if (this.correctRecord[i] === false) {
            this.correctVoiceRecord.splice(i,1);
            this.correctRecord.splice(i,1);
          }
        }
        this.audio.src = this.correctVoiceRecord[num];
        this.audio.load();
        this.audio.play();
      }
    }
  }

  //Sends sentences to Google translate
  send(paragraphSel: string) {
    if (!this.lessonCompleted) {
      const googleObj: GoogleObj = {
        q: [this.choiceOne.player, this.choiceTwo.player, this.voiceText, this.computerSentence],
        target: this.langTo.value
      };
      this.google.translate(googleObj).subscribe(
        (res: any) => {
          this.firstChoice = res.data.translations[0].translatedText.replace(/&#39;/g, "'");
          this.secondChoice = res.data.translations[1].translatedText.replace(/&#39;/g, "'");
          this.voiceTextTran = res.data.translations[2].translatedText.replace(/&#39;/g, "'");
          this.computerSentenceTran = res.data.translations[3].translatedText.replace(/&#39;/g, "'");
        },
        err => {
          console.error(err);
        }
      );
      this.userTextCorrectTrans = this.voiceTextTrans[0];
    }
    if(paragraphSel === 'choiceOne') {
      this.choiceOneTran = !this.choiceOneTran;
      this.choiceOneTranWrong = false;
    }
    if(paragraphSel === 'choiceTwo') {
      this.choiceTwoTrans = !this.choiceTwoTrans;
      this.choiceTwoTransWrong = false;
    }
    if(paragraphSel === 'computerText') {
      this.choiceComputerTrans = !this.choiceComputerTrans;
    }
    if(paragraphSel === 'voiceText') {
      this.textTran = !this.textTran;
    }
    if(paragraphSel === 'choiceOneWrong') {
      this.choiceOneTranWrong = !this.choiceOneTranWrong;
    }
    if(paragraphSel === 'choiceTwoWrong') {
      this.choiceTwoTransWrong = !this.choiceTwoTransWrong;
    }
  }

  logTranslation(role, index) {
    if (role === 'player') {
      this.logPlayerTran = this.conversationLog[index].player;
      this.tranHold = this.conversationLog[index].playerTran;
      this.conversationLog.forEach((element) => {
        element.playerTran = false;
      });
      this.conversationLog[index].playerTran = !this.tranHold;
    }
    else {
      this.logComputerTran = this.conversationLog[index].computer;
      this.computerLogTrans = !this.computerLogTrans;
      this.tranHold = this.conversationLog[index].computerTran;
      this.conversationLog.forEach((element) => {
        element.computerTran = false;
      });
      this.conversationLog[index].computerTran = !this.tranHold;
    }
    const translation: GoogleObj = {
      q: [this.logPlayerTran, this.logComputerTran],
      target: this.langTo.value
    };
    this.google.translate(translation).subscribe(
      (res: any) => {
        this.logPlayerTran = res.data.translations[0].translatedText.replace(/&#39;/g, "'");
        this.logComputerTran = res.data.translations[1].translatedText.replace(/&#39;/g, "'");
      },
      err => {
        console.error(err);
      }
    );
  }


  onPlayBack() {
    if (this.sentenceNum > 1) {
      this.goodCounter -= 1;
      if (this.sentenceNum % 2 ==0) {
        this.sentenceNum = this.sentenceNum/2;
      }
      else {
        this.sentenceNum = (this.sentenceNum - 1)/2;
      }
      this.conversationLog.pop();
      for (var i = this.userVoiceArray.length-1; i >= 0; i--) {
        if (this.correctRecord[i] === false) {
          this.correctVoiceRecord.splice(i,1);
          this.correctRecord.splice(i,1);
        }
      }
      this.correctVoiceRecord.splice(-1);
      this.correctRecord.splice(-1);
      this.choiceOne = this.serviceArray[(this.sentenceNum * 2)];
      this.choiceTwo = this.serviceArray[(this.sentenceNum * 2) + 1];
      this.userTextCorrect = this.voiceText;
      this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;
      this.recordAudio.userVoiceText = [];
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
      this.voiceText = '...';
      let videoRange = this.serviceArray[this.sentenceNum].video;
      let videoList = videoRange.split(',')
      let videoSeconds = (parseInt(videoList[1])-parseInt(videoList[0]));
      this.speaking = true;
      this.computerSentence = this.serviceArray[this.sentenceNum].computer;
      setTimeout(() => {
        this._ngzone.run(() => {
          this.speaking = false;
        })
      }, videoSeconds*1200)
      this.lessonCompleted = false;
      this.wrongAnswer = false;
      this.wrongAnswer1 = false;
      this.wrongAnswer2 = false;
      this.showVoiceText = false;
      this.send(undefined);
    }
    if (this.sentenceNum === 1) {
      this.firstPrompt = true;
    }
  }

  onPlayAgain() {
    this.lessonCompleted = false;
    this.conversationLog = [];
    this.userVoiceArray = [];
    this.correctVoiceRecord = [];
    this.correctRecord = [];
    this.sentenceNum = 1;
    this.startConversation = true;
    this.choiceOne = this.serviceArray[(this.sentenceNum * 2)];
    this.choiceTwo = this.serviceArray[(this.sentenceNum * 2) + 1];
    this.computerSentence = this.serviceArray[this.sentenceNum].computer;
    this.userTextCorrect = this.voiceText;
    this.videoUrl = this.videoBase + this.serviceArray[this.sentenceNum].video;
    this.recordAudio.userVoiceText = [];
    this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
    this.voiceText = '...';
    this.lessonCompleted = false;
    this.wrongAnswer = false;
    this.wrongAnswer1 = false;
    this.wrongAnswer2 = false;
    this.send(undefined);
    this.firstPrompt = true;
    this.goodCounter = 0;
    this.score = 0;
  }
}
