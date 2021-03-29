import {EventEmitter} from '@angular/core';
import {CheckSentence} from '../services/checksentence.service';
import {NgZone} from '@angular/core';
import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms'
import {Observable, range, Subject} from 'rxjs';

declare const annyang: any;

@Injectable({
    providedIn: 'root'
  })
export class RecordAudio{
  userVoiceText = [];
  userVoiceRec: any;
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  voiceTextReady: boolean = false;
  public voiceTextReadyObs = new Observable<boolean>();
  language: string = 'en';

	userVoiceRecChanged = new EventEmitter<any>();
	userVoiceTextChanged = new EventEmitter<any[]>();
  voiceActiveSectionDisabledChanged = new EventEmitter<boolean>();
	voiceActiveSectionErrorChanged = new EventEmitter<boolean>();
	voiceActiveSectionSuccessChanged = new EventEmitter<boolean>();
	voiceActiveSectionListeningChanged = new EventEmitter<boolean>();
	voiceTextChanged = new EventEmitter<any>();
    voiceTextReadyChanged = new EventEmitter<boolean>();

	langFrom = new FormControl('en');

  constructor(private checkSentence: CheckSentence, private ngZone: NgZone){}
  //Trying to get the service to talk to component 

  private sentenceReady = new Subject<any>();

  sentenceReady$ = this.sentenceReady.asObservable();
  
  sentenceIsReady(){
    this.sentenceReady.next();
  }
  
	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is required";
        this.voiceTextChanged.emit(this.voiceText);
        this.voiceTextReady = false;
        this.voiceTextReadyChanged.emit(this.voiceTextReady);
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true, this.voiceActiveSectionSuccessChanged.emit(this.voiceActiveSectionSuccess));
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true, this.voiceActiveSectionErrorChanged.emit(this.voiceActiveSectionError));
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true, this.voiceActiveSectionListeningChanged.emit(this.voiceActiveSectionListening));
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.voiceTextReady = false;
        this.voiceTextReadyChanged.emit(this.voiceTextReady);
        this.ngZone.run(() => this.voiceActiveSectionError = true, this.voiceActiveSectionErrorChanged.emit(this.voiceActiveSectionError));
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false, this.voiceActiveSectionErrorChanged.emit(this.voiceActiveSectionError));
      this.userVoiceRec = userSaid[0];
      this.userVoiceRecChanged.emit(this.userVoiceRec);
			let queryText: any = userSaid[0];

			annyang.abort();


      this.voiceText = queryText;
      this.voiceTextChanged.emit(this.voiceText);
      this.voiceTextReady = true;
      this.userVoiceText.push(this.voiceText);
      this.userVoiceTextChanged.emit(this.userVoiceText);
      this.sentenceIsReady();
      console.log(this.userVoiceText);
      //Observable 
      
    //   this.voiceTextReadyObs = true;
    this.voiceTextReadyChanged.emit(this.voiceTextReady);
	  this.ngZone.run(() => this.voiceActiveSectionListening = false, this.voiceActiveSectionListeningChanged.emit(this.voiceActiveSectionListening));
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true, this.voiceActiveSectionSuccessChanged.emit(this.voiceActiveSectionSuccess));
      this.voiceTextReadyChanged.emit(this.voiceTextReady);
      console.log(this.voiceText);
      console.log(this.voiceTextReady);
      annyang.removeCallback('result');
		});
	}

  clearText(){
    this.userVoiceText = [];
  }

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
        this.voiceText = undefined;
        this.voiceTextReady = false;

        this.voiceActiveSectionDisabledChanged.emit(this.voiceActiveSectionDisabled);
        this.voiceActiveSectionErrorChanged.emit(this.voiceActiveSectionError);
        this.voiceActiveSectionSuccessChanged.emit(this.voiceActiveSectionSuccess);
        this.voiceTextChanged.emit(this.voiceText);
        this.voiceTextReadyChanged.emit(this.voiceTextReady);        

		if (annyang) {
			let commands = {

				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);
			annyang.setLanguage(this.language);
      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

      this.voiceActiveSectionDisabledChanged.emit(this.voiceActiveSectionDisabled);
      this.voiceActiveSectionErrorChanged.emit(this.voiceActiveSectionError);
      this.voiceActiveSectionSuccessChanged.emit(this.voiceActiveSectionSuccess);
      this.voiceTextChanged.emit(this.voiceText);
      this.voiceActiveSectionListeningChanged.emit(this.voiceActiveSectionListening);

		if(annyang){
      annyang.abort();
    }
	}
    setLanguage(newLanguage: string){
        this.language = newLanguage;
    }
}