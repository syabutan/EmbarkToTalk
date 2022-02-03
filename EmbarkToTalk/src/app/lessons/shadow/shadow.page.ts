import { AfterContentChecked, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CheckSentence } from '../../services/checksentence.service';
import { RecordAudio } from '../../services/recordaudio.service';
import { FormControl } from '@angular/forms';
import { GoogleObj } from '../../models/solution';
import { GoogletranslateService } from '../../services/googletranslate.service';
import { ShadowSpanishService } from '../../services/lessons/shadow.spanish.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.page.html',
  styleUrls: ['./shadow.page.scss'],
})
export class ShadowPage implements OnInit, AfterContentChecked {
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
  public correctRecord = [];
  public correctVoiceRecord = [];
  public notPlaying = true;
  public audio = new Audio();
  public userTextCorrect = "";
  public userTextCorrectTrans = '';
  public showVoiceText = false;
  public showVoiceText2 = false;
  public computerVoiceArray = [];
  public conversationLog = [{
    computer: '',
    player: '',
    computerTran: false,
    playerTran: false,
    id: 0,
    computerIcon: 'play-outline',
    playerIcon: 'play-outline'
  }];
  public audioIconArray = [];
  public fullConversation = [];
  //To know whether to show L1 or L2
  public choiceComputerTrans = false;
  public choiceUserTrans = false;
  public choiceOneTran = false;
  public textTran = false;
  public voiceTextTrans = [];
  public userArray = [];
  public langFrom = new FormControl('es');
  public langTo = new FormControl('en');
  public scoreLeft: number = 0;
  public scoreRight: number = 0;
  public score: number = 0;
  //Highlight missed words
  public correctOrNot: number;
  public correctOrNotArray = [{ boolean: false, chunk: '' }];
  public correctOrNotBoolean: boolean;
  public wrongAnswer = false;
  public firstPrompt = true;
  public chunkSentence = [];
  public chunkCheck: string;
  public noSpace = false;
  //Japanese tree
  public computerSentenceArray = [];
  public showAccuracy: boolean;
  public langSwitch: boolean;
  public cpImage = "../../../assets/icon/sammy.png"
  public userImage = "../../../assets/icon/blank.webp"
  //store user choices and computer responce
  public computerSentence: string = '';
  public choiceOne;
  public choiceTwo;
  public serviceArray;
  public sentenceNum = 0;
  public logNum = 0;
  public scriptTran: string;
  public voiceTextTran: string;
  public computerSentenceTran: string;
  public logPlayerTran: string;
  public logComputerTran: string;
  public tranHold = false;
  public userLogTrans = false;
  public computerLogTrans = false;
  public roleChosen = false;
  public lessonCompleted = false;
  public id = 0;
  public againButton = 'RESTART';
  public startConversation = true;
  public audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"]
  public speaking = false;
  public startButton = 'START CONVERSATION';

  constructor(
    private google: GoogletranslateService,
    private recordAudio: RecordAudio,
    private checkSentence: CheckSentence,
    private shadowservice: ShadowSpanishService,
    private cdref: ChangeDetectorRef,
    private alertController: AlertController,
    private _ngzone: NgZone) {
      this.showAccuracy = true;
      this.langSwitch = true;
  }

  ngOnInit() {
    this.audio.addEventListener("ended", () => {
      this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
      this.conversationLog.forEach(element => {
        element.computerIcon = 'play-outline';
        element.playerIcon = 'play-outline';
      })
      this.speaking = false;
    });
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
      (change: any) => {this.userVoice = change;
        this.userVoiceArray.push(change);
        this.correctVoiceRecord.push(change);
      });
    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
    this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
    this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
    this.voiceActiveSectionListening = this.voiceActiveSectionListening;
    this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
    this.checkSentence.updateSentences(this.choiceOne, this.choiceTwo, this.voiceText);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  async _alert() {
    const alert = await this.alertController.create({
      header: 'Choose your role',
      backdropDismiss: true,
      inputs: [
        {
          name: 'username',
          type: 'radio',
          label: 'Mr. Brown',
          value: 1
        },
        {
          name: 'password',
          type: 'radio',
          label: 'Neighbor',
          value: 2
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel'
        },
        {
          text: "OK",
          handler: (value: any) => {
            if (value == 1 || value == 2) {
              this._ngzone.run(() => {
                this.startConversation = false;
                this.chooseRoleplay(value.toString());
              })
            }
          }
        }]
    });
    await alert.present();
  }

  onStartVoiceRecognition() {
    this.showVoiceText = true;
    this.showVoiceText2 = false;
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
  }

  //pick which who you want to roleplay as
  chooseRoleplay(event) {
    this.value = event;
    if (this.value === '1') {
      this.serviceArray = this.shadowservice.getAllArrays1();
      this.cpImage = "../../../assets/icon/missionary-couple.jpg";
      this.userImage = "../../../assets/icon/neighbor.jpg";
      this.speaking = true;
    }
    else if (this.value === '2') {
      this.serviceArray = this.shadowservice.getAllArrays2();
      this.cpImage = "../../../assets/icon/neighbor.jpg";
      this.userImage = "../../../assets/icon/missionary-couple.jpg";
      this.speaking = false;
    }
    else {
      this.startConversation = true;
    }
    this.computerSentence = this.serviceArray[0].computer;
    this.choiceOne = this.serviceArray[0];
    this.audio.pause();
    if (this.serviceArray[0].voiceComputer !== '') {
      this.audio.src = this.serviceArray[0].voiceComputer;
      this.audioIcon[1] = 'stop-outline';
      this.audio.load();
      this.audio.play();
    }
    this.conversationLog = [];
    this.firstPrompt = true;
    this.sentenceNum = parseInt(this.choiceOne.id);
    this.roleChosen = true;
    this.voiceText = '...';
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
    this.score = this.checkSentence.checkPercent(this.choiceOne.player, this.voiceText);
    this.chunkSentence = this.choiceOne.player.split(' ');
    for (let chunk of this.chunkSentence) {
      this.correctOrNot = this.voiceText.toLowerCase().indexOf(chunk.toLowerCase());
      if (this.correctOrNot === -1) {
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
    if (this.score >= .7) {
      this.sentenceNum = parseInt(this.choiceOne.id);
      this.conversationLog.push({
        computer: this.computerSentence,
        player: this.voiceText,
        computerTran: false,
        playerTran: false,
        id: this.sentenceNum,
        computerIcon: 'play-outline',
        playerIcon: 'play-outline'
      });
      this.logNum += 1;
      this.sentenceNum += 1;
      this.audio.src = this.serviceArray[this.sentenceNum].voiceComputer;
      this.voiceText = '...';
      this.showVoiceText2 = false;
      this.wrongAnswer = false;
      this.audioIconArray.push({
        computer: 'play-outline',
        player: 'play-outline'
      })
      this.choiceOne = this.serviceArray[this.sentenceNum];
      this.computerSentence = this.serviceArray[this.sentenceNum].computer
      this.audio.pause();
      this.audio.src = this.serviceArray[this.sentenceNum].voiceComputer;
      this.audio.load();
      this.audio.play();
      this.userTextCorrect = this.voiceText;
      this.showVoiceText2 = false;
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
      this.wrongAnswer = false;
      this.speaking = true;
      this.showVoiceText = false;
      this.correctRecord.push(true);
    }
    else {
      this.showVoiceText = true;
      this.showVoiceText2 = true;
      this.correctRecord.push(false);
    }
    this.firstPrompt = false;
    this.send(undefined);
    if (this.sentenceNum >= this.serviceArray.length-1) {
      this.lessonCompleted = true;
    }
  }

  onListenToSentence(num: number) {
    //1 is userChoice, two is most recent computer sentence
    if (num === 1) {
      if (this.audioIcon[0] === "stop-outline") {
        this.audioIcon[0] = "play-outline";
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[0] = "stop-outline"
        this.audio.pause();
        this.audio.src = this.serviceArray[this.sentenceNum].voicePlayer;
        this.audio.load();
        this.audio.play();
      }
    }
    else if (num === 3) {
      if (this.audioIcon[1] === "stop-outline") {
        this.audioIcon[1] = "play-outline";
        this.audio.pause();
      }
      else {
        this.audioIcon = ["play-outline", "play-outline", "play-outline", "play-outline"];
        for (var i= 0; i < this.conversationLog.length; i++) {
          this.conversationLog[i].computerIcon = 'play-outline';
          this.conversationLog[i].playerIcon = 'play-outline';
        }
        this.audioIcon[1] = "stop-outline"
        this.audio.pause();
        this.audio.src = this.serviceArray[this.sentenceNum].voiceComputer;
        this.audio.load();
        this.audio.play();
      }
    }
  }

  onListenToLog (num: number) {
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
      this.id = this.conversationLog[num].id;
      this.audio.src = this.serviceArray[this.id].voiceComputer
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
    if (paragraphSel === 'choiceOne') {
      this.choiceOneTran = !this.choiceOneTran;
    }
    if (paragraphSel === 'computerText') {
      this.choiceComputerTrans = !this.choiceComputerTrans;
    }
    if (paragraphSel === 'voiceText') {
      this.textTran = !this.textTran;
    }
    const googleObj: GoogleObj = {
      q: [this.choiceOne.player, this.voiceText, this.computerSentence],
      target: this.langTo.value
    };
    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.scriptTran = res.data.translations[0].translatedText.replace(/&#39;/g, "'");
        this.voiceTextTran = res.data.translations[1].translatedText.replace(/&#39;/g, "'");
        this.computerSentenceTran = res.data.translations[2].translatedText.replace(/&#39;/g, "'");
      },
      err => {
        console.error(err);
      }
    );
    this.userTextCorrectTrans = this.voiceTextTrans[0];
  }

  logTranslation(role, index) {
    if (role === 'player') {
      this.logPlayerTran = this.conversationLog[index].player;
      this.userLogTrans = !this.userLogTrans;
      this.tranHold = this.conversationLog[index].playerTran;
      this.conversationLog.forEach(element => {
        element.playerTran = false;
      });
      this.conversationLog[index].playerTran = !this.tranHold;
    }
    else {
      this.logComputerTran = this.conversationLog[index].computer;
      this.computerLogTrans = !this.computerLogTrans;
      this.tranHold = this.conversationLog[index].computerTran;
      this.conversationLog.forEach(element => {
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
        this.fullConversation[count + 1] = this.serviceArray[this.sentenceNum].voiceComputer;
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

  onPlayBack() {
    if (this.sentenceNum >= 1) {
      this.conversationLog.pop();
      for (var i = this.userVoiceArray.length-1; i >= 0; i--) {
        if (this.correctRecord[i] === false) {
          this.correctVoiceRecord.splice(i,1);
          this.correctRecord.splice(i,1);
        }
      }
      this.sentenceNum -= 1;
      this.choiceOne = this.serviceArray[(this.sentenceNum)];
      this.computerSentence = this.serviceArray[this.sentenceNum].computer;
      this.userTextCorrect = this.voiceText;
      this.recordAudio.userVoiceText = [];
      this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
      this.voiceText = '...';
      this.wrongAnswer = false;
      this.audio.pause();
      this.audio.src = this.serviceArray[this.sentenceNum].voiceComputer;
      this.audio.load();
      this.audio.play();
      this.send(undefined);
      this.lessonCompleted = false;
      this.speaking = true;
    }
  }

  onPlayAgain() {
    this.audioIcon[1] = 'stop-outline';
    this.sentenceNum = 0;
    this.conversationLog = [];
    this.userVoiceArray = [];
    this.correctVoiceRecord = [];
    this.correctRecord = [];
    this.choiceOne = this.serviceArray[(this.sentenceNum)];
    this.computerSentence = this.serviceArray[this.sentenceNum].computer;
    this.userTextCorrect = this.voiceText;
    this.recordAudio.userVoiceText = [];
    this.userTextCorrectTrans = this.voiceTextTrans[this.voiceTextTrans.length];
    this.voiceText = '...';
    this.wrongAnswer = false;
    this.audio.pause();
    this.audio.src = this.serviceArray[this.sentenceNum].voiceComputer;
    this.audio.load();
    this.audio.play();
    this.send(undefined);
    this.lessonCompleted = false;
  }
}
