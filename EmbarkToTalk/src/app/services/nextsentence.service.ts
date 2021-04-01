import { Injectable } from '@angular/core';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NextSentenceService {
    nextSentence: number = 0;
    nextSentenceChecked = new EventEmitter<any>();
    constructor(){}

    onIsReady(isReady: boolean){
        return true;
    }

    onNextSentence(){
      this.nextSentence +=1;
      this.nextSentenceChecked.emit(this.nextSentence);
    }

}
