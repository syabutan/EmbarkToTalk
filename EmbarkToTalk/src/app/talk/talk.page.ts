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

  //Setting up computer tree
  
  emptyNodeComp: TreenodeComputer = {
    name: '',
    video: '',
    leftChild: '',
    rightChild: '',
    audio: ''
  }
  
  node32: TreenodeComputer = {
    name: '¿Cómo?',
    video: '162,163',
    leftChild: '',
    rightChild: '',
    audio: '../../assets/soundFile/spanish-lesson/32.mp3'
  }
   node29: TreenodeComputer = {
    name: '¡Muy bien gracias! ¡Hasta luego!',
    video: '',
    leftChild: this.emptyNodeComp,
    rightChild: this.emptyNodeComp,
    audio: '../../assets/soundFile/spanish-lesson/29.mp3'
  }
  nodeRepeat: TreenodeComputer = {
    name: 'Si, es 801-433-2278',
    video: '140,147',
    leftChild: this.node29,
    rightChild: '',
    audio: '../../assets/soundFile/spanish-lesson/28.0.mp3'
  }
  node30: TreenodeComputer = {
    name: '¿Podría repetirlo?',
    video: '',
    leftChild: this.nodeRepeat,
    rightChild: this. nodeRepeat,
    audio: '../../assets/soundFile/spanish-lesson/30.mp3'
  }
 
  node28: TreenodeComputer = {
    name: 'Si, es 801-433-2278',
    video: '140,147',
    leftChild: this.node29,
    rightChild: this.node30,
    audio: '../../assets/soundFile/spanish-lesson/28.0.mp3'
  }
  node60: TreenodeComputer = {
    name: '¡Está bien! Conocemos un miembro que puede darle transporte. ¿Nos daría su número de teléfono?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/60.mp3'
  }
  node59: TreenodeComputer = {
    name: 'No se preocupe, puede caminar con nosotros. ¿Nos daría su número de teléfono?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/59.mp3'
  }
  node80: TreenodeComputer = {
    name: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día par avenir a visitarle?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/80.mp3'
  }
  node79: TreenodeComputer = {
    name: '¿Nos daría su número de teléfono?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/79.mp3'
  }
  node76: TreenodeComputer = {
    name: '¡Si claro!',
    video: '500,502',
    leftChild: this.node79,
    rightChild: this.node80,
    audio: '../../assets/soundFile/spanish-lesson/76.mp3'
  }
  node73: TreenodeComputer = {
    name: 'No se preocupe.',
    video: '',
    leftChild: this.emptyNodeComp,
    rightChild: this.emptyNodeComp,
    audio: '../../assets/soundFile/spanish-lesson/73.mp3'
  }
  node72: TreenodeComputer = {
    name: '¡Está bien, no hay problema! ¡Adiós!',
    video: '',
    leftChild: this.emptyNodeComp,
    rightChild: this.emptyNodeComp,
    audio: '../../assets/soundFile/spanish-lesson/72.mp3'
  }
  node70: TreenodeComputer = {
    name: 'No, realmente no tengo interés.',
    video: '468,471',
    leftChild: this.node72,
    rightChild: this.node73,
    audio: '../../assets/soundFile/spanish-lesson/70.mp3'
  }
  node27: TreenodeComputer = {
    name: 'No se preocupe, que tal que hablamos mas cuando sea mejor. ¿Podemos tener su numero de teléfono?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/27.mp3'
  }
  node93: TreenodeComputer = {
    name: '¡Gracias! ¡Adiós!',
    video: '634,636',
    leftChild: this.emptyNodeComp,
    rightChild: this.emptyNodeComp,
    audio: '../../assets/soundFile/spanish-lesson/93.mp3'
  }
  node92: TreenodeComputer = {
    name: 'Está bien. ¡Esperamos que venga esta semana!',
    video: '',
    leftChild: this.node93,
    rightChild: this.node93,
    audio: '../../assets/soundFile/spanish-lesson/92.mp3'
  }
  
  
  node88: TreenodeComputer = {
    name: 'Me imagino. De hecho tenemos una clase de ingles gratis, le gustaría asistir?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/88.mp3'
  }
  
  node85: TreenodeComputer = {
    name: 'Que bien. Bueno nos gustaría visitarle un día pronto para conocerle y su familia. ¿Qué le parece?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/85.mp3'
  }
  
  node48: TreenodeComputer = {
    name: 'Está bien. ¿Nos gustaría conocerle, está bien si pasamos por su casa un día?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/48.mp3'
  }
   
  node62: TreenodeComputer = {
    name: '¿Está bien, podemos tener su número de teléfono para mandarle la dirección?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/62.mp3'
  }
  node91: TreenodeComputer = {
    name: 'Si tengo carro.',
    video: '629,631',
    leftChild: this.node62,
    rightChild: this.node92,
    audio: '../../assets/soundFile/spanish-lesson/91.mp3'
  }
  node61: TreenodeComputer = {
    name: '¡Allí le esperamos! ¿Nos daría su número de teléfono?',
    video: '',
    leftChild: this.node28,
    rightChild: this.node28,
    audio: '../../assets/soundFile/spanish-lesson/61.mp3'
  }
  node55: TreenodeComputer = {
    name: 'No tengo carro y por eso no puedo ir.',
    video: '355,358',
    leftChild: this.node59,
    rightChild: this.node60,
    audio: '../../assets/soundFile/spanish-lesson/55.mp3'
  }
  node63: TreenodeComputer = {
    name: '¡Muy bien! ¿Tiene una manera para llegar allí?',
    video: '',
    leftChild: this.node55,
    rightChild: this.node91,
    audio: '../../assets/soundFile/spanish-lesson/63.mp3'
  }
  node58: TreenodeComputer = {
    name: '¡Si claro!',
    video: '380.5,382',
    leftChild: this.node62,
    rightChild: this.node63,
    audio: '../../assets/soundFile/spanish-lesson/58.mp3'
  }
  node57: TreenodeComputer = {
    name: 'No puedo esta semana, pero tal vez por la próxima.',
    video: '374,378',
    leftChild: this.node62,
    rightChild: this.node63,
    audio: '../../assets/soundFile/spanish-lesson/57.mp3'
  }
  node56: TreenodeComputer = {
    name: '¿En serio? ¡Voy esta semana!',
    video: '364,367',
    leftChild: this.node61,
    rightChild: this.node63,
    audio: '../../assets/soundFile/spanish-lesson/56.mp3'
  }
  
  node52: TreenodeComputer = {
    name: '¿Le gustaría venir con nosotros esta semana?',
    video: '',
    leftChild: this.node57,
    rightChild: this.node58,
    audio: '../../assets/soundFile/spanish-lesson/52.mp3'
  }
  node51: TreenodeComputer = {
    name: '¡Si! ¿Le gustaría venir con nosotros esta semana?',
    video: '',
    leftChild: this.node57,
    rightChild: this.node58,
    audio: '../../assets/soundFile/spanish-lesson/51.mp3'
  }
  node50: TreenodeComputer = {
    name: 'Si claro. Queda solo cinco minutos de aquí.',
    video: '',
    leftChild: this.node55,
    rightChild: this.node56,
    audio: '../../assets/soundFile/spanish-lesson/50.mp3'
  }
  node47: TreenodeComputer = {
    name: 'Si, pero hace unas semanas.',
    video: '336,340',
    leftChild: this.node52,
    rightChild: this.node48,
    audio: '../../assets/soundFile/spanish-lesson/47.mp3'
  }
  node46: TreenodeComputer = {
    name: '¿Aun no, hay una iglesia que queda cerca?',
    video: '326,330',
    leftChild: this.node50,
    rightChild: this.node51,
    audio: '../../assets/soundFile/spanish-lesson/46.mp3'
  }
  node41: TreenodeComputer = {
    name: '¡Si! ¿Ha ido a la iglesia aquí?',
    video: '',
    leftChild: this.node46,
    rightChild: this.node47,
    audio: '../../assets/soundFile/spanish-lesson/41.mp3'
  }
  node83: TreenodeComputer = {
    name: 'Me bauticé cuando tenía ocho años. Toda mi familia es parte de la iglesia.',
    video: '537,543',
    leftChild: this.node41,
    rightChild: this.node85,
    audio: '../../assets/soundFile/spanish-lesson/83.mp3'
  }
  
  node82: TreenodeComputer = {
    name: 'Apenas dos años. Fue una experiencia muy linda.',
    video: '512,517',
    leftChild: this.node41,
    rightChild: this.node48,
    audio: '../../assets/soundFile/spanish-lesson/82.mp3'
  }
  node42: TreenodeComputer = {
    name: '¡Si! ¿Hace cuánto desde que se bautizó?',
    video: '',
    leftChild: this.node82,
    rightChild: this.node83,
    audio: '../../assets/soundFile/spanish-lesson/42.mp3'
  }
  node64: TreenodeComputer = {
    name: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/64.mp3'
  }
  
  
  
  // node90: TreenodeComputer = {
  //   name: 'Para nosotros la familia es la mas importante. ¿Ha escuchado de algo se llama un templo?',
  //   video: '',
  //   leftChild: this.node74,
  //   rightChild: this.node75,
  //   audio: ''
  // }
  
  node77: TreenodeComputer = {
    name: 'Está bien. Bueno, los templos son muy importantes porque nos ayuda tener una familia eterna. ¿Está bien si pasamos un día para hablar sobre como tener una familia eterna?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/77.mp3'
  }
  
  node54: TreenodeComputer = {
    name: '¡Claro que sí! Por eso me mudé aquí.',
    video: '422,425',
    leftChild: this.node64,
    rightChild: '',
    audio: '../../assets/soundFile/spanish-lesson/54.mp3'
  }
  node53: TreenodeComputer = {
    name: 'Si claro, mi familia es la cosa más importante en mi vida.',
    video: '411,416',
    leftChild: this.node64,
    rightChild: this.emptyNodeComp,
    audio: '../../assets/soundFile/spanish-lesson/53.mp3'
  }
  node78: TreenodeComputer = {
    name: 'No se preocupe. ¿Me imagino que su familia es importante para usted verdad?',
    video: '',
    leftChild: this.node53,
    rightChild: this.node54,
    audio: '../../assets/soundFile/spanish-lesson/78.mp3'
  }
  node74: TreenodeComputer = {
    name: 'Creo que sí, pero no estoy segura.',
    video: '478,481',
    leftChild: this.node77,
    rightChild: this.node78,
    audio: '../../assets/soundFile/spanish-lesson/74.mp3'
  }
  node75: TreenodeComputer = {
    name: 'Nunca he visto pero he escuchado de algo así.',
    video: '491,495',
    leftChild: this.node78,
    rightChild: this.node77,
    audio: '../../assets/soundFile/spanish-lesson/75.mp3'
  }
  node19: TreenodeComputer = {
    name: 'Bueno, estamos compartiendo un mensaje de Jesucristo. ¿Le gustaría escucharlo?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/19.0.mp3'
  }
  
  
  node71: TreenodeComputer = {
    name: '¡Qué bien! ¿Que tal si pasamos un día y hablamos sobre Jesucristo?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/71.mp3'
  }
  
  node69: TreenodeComputer = {
    name: 'Unas veces, pero no mucho. Pero ya creo en Jesucristo.',
    video: '455,459',
    leftChild: this.node71,
    rightChild: this.node64,
    audio: '../../assets/soundFile/spanish-lesson/69.mp3'
  }
  node68: TreenodeComputer = {
    name: '¿De verdad? También hay un edificio allí que se llama el temple. Parece como un castillo blano. ¿Lo ha visto?',
    video: '',
    leftChild: this.node74,
    rightChild: this.node75,
    audio: '../../assets/soundFile/spanish-lesson/68.mp3'
  }
  node67: TreenodeComputer = {
    name: 'Claro, hay misioneros allí también. ¿Ha hablado con misioneros antes?',
    video: '',
    leftChild: this.node69,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/67.mp3'
  }
  node66: TreenodeComputer = {
    name: 'Si, lo conozco. Creo que he visto unos muchachos caminados por allí.',
    video: '441,446',
    leftChild: this.node67,
    rightChild: this.node68,
    audio: '../../assets/soundFile/spanish-lesson/66.mp3'
  }
  node65: TreenodeComputer = {
    name: '¿Conoce el hospital San Lucas? Allí cerquita.',
    video: '',
    leftChild: this.node66,
    rightChild: this.node66,
    audio: '../../assets/soundFile/spanish-lesson/65.mp3'
  }
 

  

  
  node49: TreenodeComputer = {
    name: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante?',
    video: '',
    leftChild: this.node53,
    rightChild: this.node54,
    audio: '../../assets/soundFile/spanish-lesson/49.mp3'
  }

  node45: TreenodeComputer = {
    name: 'Bueno, no tengo mucho tiempo ahora, ¡pero mucho gusto!',
    video: '314.5,317',
    leftChild: this.node27,
    rightChild: this.node93,
    audio: '../../assets/soundFile/spanish-lesson/45.mp3'
  }
  node44: TreenodeComputer = {
    name: 'He visto misioneros allí con camisas blancas. Creo que conocí a un misionero se llamaba Elder.',
    video: '300,307',
    leftChild: this.node19,
    rightChild: this.node64,
    audio: '../../assets/soundFile/spanish-lesson/44.mp3'
  }
  node43: TreenodeComputer = {
    name: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
    video: '',
    leftChild: this.node76,
    rightChild: this.node70,
    audio: '../../assets/soundFile/spanish-lesson/43.mp3'
  }
  node89: TreenodeComputer = {
    name: 'Trabajo en una panadería. Tengo que proveer por mi familia.',
    video: '614,619',
    leftChild: this.node43,
    rightChild: this.node49,
    audio: '../../assets/soundFile/spanish-lesson/89.mp3'
  }
  node87: TreenodeComputer = {
    name: 'Si entiendo. ¿En que trabaja?',
    video: '',
    leftChild: this.node89,
    rightChild: this.node89,
    audio: '../../assets/soundFile/spanish-lesson/87.mp3'
  }
  node40: TreenodeComputer = {
    name: 'Somos misioneros y nuestra iglesia tiene un lugar para aprender español.',
    video: '',
    leftChild: this.node44,
    rightChild: this.node45,
    audio: '../../assets/soundFile/spanish-lesson/40.mp3'
  }
  node39: TreenodeComputer = {
    name: 'Bueno. La situación es un poco complicada allí y vine aquí para trabajar.',
    video: '274,280',
    leftChild: this.node87,
    rightChild: this.node88,
    audio: '../../assets/soundFile/spanish-lesson/39.mp3'
  }
  node38: TreenodeComputer = {
    name: 'Quería aprender inglés y también tengo familia aquí.',
    video: '202,206',
    leftChild: this.node43,
    rightChild: this.node49,
    audio: '../../assets/soundFile/spanish-lesson/38.mp3'
  }
  node37: TreenodeComputer = {
    name: '¿Fuiste a la CCM? Soy miembro de tu iglesia allí.',
    video: '189,194',
    leftChild: this.node41,
    rightChild: this.node42,
    audio: '../../assets/soundFile/spanish-lesson/37.mp3'
  }
  node36: TreenodeComputer = {
    name: '¡Tú hablas muy bien! ¿Dónde viviste? ',
    video: '177,181',
    leftChild: this.node40,
    rightChild: this.node65,
    audio: '../../assets/soundFile/spanish-lesson/36.mp3'
  }
  node35: TreenodeComputer = {
    name: 'He escuchado que México es muy bonito. ¿Por qué se mudó aquí?',
    video: '',
    leftChild: this.node38,
    rightChild: this.node39,
    audio: '../../assets/soundFile/spanish-lesson/35.mp3'
  }
  node34: TreenodeComputer = {
    name: '¿Enserio? Viví allí por un tiempo para aprender español.',
    video: '',
    leftChild: this.node36,
    rightChild: this.node37,
    audio: '../../assets/soundFile/spanish-lesson/34.mp3'
  }
  node33: TreenodeComputer = {
    name: '¿Mande?',
    video: '165,166',
    leftChild: '',
    rightChild: '',
    audio: '../../assets/soundFile/spanish-lesson/33.mp3'
  }

  
  node25: TreenodeComputer = {
    name: 'Aun no, pero tengo unos amigos de allí que viven aquí. ¿Por qué se mudó aquí?',
    video: '',
    leftChild: this.node38,
    rightChild: this.node39,
    audio: '../../assets/soundFile/spanish-lesson/25.0.mp3'
  }
  node24: TreenodeComputer = {
    name: '¡No, pero ojalá un día yo tenga la oportunidad! ¿Dijo que llegó con su familia, su familia es muy importante para usted entonces?',
    video: '',
    leftChild: this.node53,
    rightChild: this.node54,
    audio: '../../assets/soundFile/spanish-lesson/24.0.mp3'
  }
  
  node20: TreenodeComputer = {
    name: 'Bueno, vivía en Barcelona, ¿han visitado allí?',
    video: '83,87',
    leftChild: this.node24,
    rightChild: this.node25,
    audio: '../../assets/soundFile/spanish-lesson/20.0.mp3'
  }
 
  node16: TreenodeComputer = {
    name: '¿He escuchado que España es hermosa, en que parte vivía?',
    video: '',
    leftChild: this.node20,
    rightChild: this.node20,
    audio: '../../assets/soundFile/spanish-lesson/16.0.mp3'
  }
  node15: TreenodeComputer = {
    name: '¡Que bien! ¿Por qué vino por acá?',
    video: '',
    leftChild: this.node38,
    rightChild: this.node39,
    audio: '../../assets/soundFile/spanish-lesson/15.0.mp3'
  }
 
  node9: TreenodeComputer = {
    name: 'Soy de la cuidad de México.',
    video: '17.5,20',
    leftChild: this.node34,
    rightChild: this.node35,
    audio: '../../assets/soundFile/spanish-lesson/9.0.mp3'
  }
  node10: TreenodeComputer = {
    name: 'Mi familia es de México, pero me creí en España.',
    video: '26,30',
    leftChild: this.node15,
    rightChild: this.node16,
    audio: '../../assets/soundFile/spanish-lesson/10.0.mp3'
  }
  node26: TreenodeComputer = {
    name: 'Espero que puedan venir también. ¿De dónde es?',
    video: '',
    leftChild: this.node9,
    rightChild: this.node10,
    audio: '../../assets/soundFile/spanish-lesson/26.0.mp3'
  }
  node22: TreenodeComputer = {
    name: 'Si me encanta. Espero que toda mi familia tenga la oportunidad de venir aquí un día.',
    video: '107,114',
    leftChild: this.node26,
    rightChild: this.node49,
    audio: '../../assets/soundFile/spanish-lesson/22.0.mp3'
  }
  node5: TreenodeComputer = {
    name: '¡Que bien! ¿De dónde es?',
    video: '',
    leftChild: this.node9,
    rightChild: this.node10,
    audio: '../../assets/soundFile/spanish-lesson/5.0.mp3'
  }
  node23: TreenodeComputer = {
    name: 'De verdad no mucho. Ha sido muy difícil estar lejos de mi familia.',
    video: '122.5,127',
    leftChild: this.node49,
    rightChild: this.node5,
    audio: '../../assets/soundFile/spanish-lesson/23.0.mp3'
  }
  node14: TreenodeComputer = {
    name: 'No, solo vine para pasear.',
    video: '71,74',
    leftChild: this.node19,
    rightChild: this.node5,
    audio: '../../assets/soundFile/spanish-lesson/14.00.mp3'
  }
  node17: TreenodeComputer = {
    name: '¿En dónde vivía antes?',
    video: '',
    leftChild: this.node9,
    rightChild: this.node10,
    audio: '../../assets/soundFile/spanish-lesson/17.0.mp3'
  }
  node18: TreenodeComputer = {
    name: '¿Qué tal los Estados Unidos? ¿Le gusta?',
    video: '',
    leftChild: this.node22,
    rightChild: this.node23,
    audio: '../../assets/soundFile/spanish-lesson/18.0.mp3'
  }
  node13: TreenodeComputer = {
    name: 'Si. Vine para visitar mi mama y mis dos hermanos.',
    video: '62,66',
    leftChild: this.node49,
    rightChild: this.node5,
    audio: '../../assets/soundFile/spanish-lesson/13.0.mp3'
  }
  node12: TreenodeComputer = {
    name: 'Bueno, me mudé a Estados Unidos hace un año, pero solo llevo unas semanas aquí.',
    video: '47,54',
    leftChild: this.node17,
    rightChild: this.node18,
    audio: '../../assets/soundFile/spanish-lesson/12.0.mp3'
  }
  node11: TreenodeComputer = {
    name: '¡Solo unos días, nada más!',
    video: '',
    leftChild: '',
    rightChild: '',
    audio: '../../assets/soundFile/spanish-lesson/11.0.mp3'
  }
  
  node8: TreenodeComputer = {
    name: '¿Está visitando familia?',
    video: '',
    leftChild: this.node13,
    rightChild: this.node14,
    audio: '../../assets/soundFile/spanish-lesson/8.0.mp3'
  }
  node7: TreenodeComputer = {
    name: '¡Que divertido! ¿De dónde es?',
    video: '',
    leftChild: this.node9,
    rightChild: this.node10,
    audio: '../../assets/soundFile/spanish-lesson/7.0.mp3'
  }
  node6: TreenodeComputer = {
    name: '¿Hace cuánto tiempo desde que llegó aquí?',
    video: '',
    leftChild: this.node12,
    rightChild: this.node12,
    audio: '../../assets/soundFile/spanish-lesson/6.0.mp3'
  }
  
  node4: TreenodeComputer = {
    name: 'No, solo estoy visitando.',
    video: '9,12',
    leftChild: this.node5,
    rightChild: this.node8,
    audio: '../../assets/soundFile/spanish-lesson/4.0.mp3'
  }
  node3: TreenodeComputer = {
    name: 'Bueno. Apenas llegué con mi familia.',
    video: '2.5,6',
    leftChild: this.node5,
    rightChild: this.node6,
    audio: '../../assets/soundFile/spanish-lesson/3.0.mp3'
  }
  node2: TreenodeComputer = {
    name: 'Perdón, apenas llegué aquí. ¿Conoce el área?',
    video: '',
    leftChild: this.node3,
    rightChild: this.node4,
    audio: '../../assets/soundFile/spanish-lesson/2.0.mp3'
  }
  node1: TreenodeComputer = {
    name: '¿Disculpe, usted vive por aquí?',
    video: '',
    leftChild: this.node3,
    rightChild: this.node4,
    audio: '../../assets/soundFile/spanish-lesson/1.0.mp3'
  }
  //we are going to start at node1
  parentNode: TreenodeComputer = {
    name: '',
    video: '',
    leftChild: this.node1,
    rightChild: this.node2,
    audio: ''
  }

  cpImage ="../../../assets/icon/sammy.png"
  userImage ="../../../assets/icon/blank.webp"

  //store user choices and computer responce
  computerSentence: string = '';
  choiceOne: string = '';
  choiceTwo: string = '';

  constructor(private nextSentence: NextSentenceService, private modalCtrl: ModalController, private google: GoogletranslateService , private solution: SolutionService, private recordAudio: RecordAudio, private checkSentence: CheckSentence) {
    this.videoUrl = this.videoBase + 6;

    this.showAccuracy = true;
    this.langSwitch = true;
    this.computerSentence = this.parentNode.name;
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
      var rand = Math.floor(Math.random() * 2);
      if(rand === 0){
        this.parentNode = this.parentNode.leftChild.leftChild;

      }
      else{
        this.parentNode = this.parentNode.leftChild.rightChild;
      }
      this.choiceOne = this.parentNode.leftChild.name;
      this.choiceTwo = this.parentNode.rightChild.name;
      this.computerSentence = this.parentNode.name;

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
      this.videoUrl = this.videoBase + this.parentNode.video;
    
    }
    else if(this.scoreRight >= .7){
      var rand = Math.floor(Math.random() * 2);
      if(rand === 0){
        this.parentNode = this.parentNode.rightChild.leftChild;
      }
      else{
        this.parentNode = this.parentNode.rightChild.rightChild;
      }
      this.choiceOne = this.parentNode.leftChild.name;
      this.choiceTwo = this.parentNode.rightChild.name;
      this.computerSentence = this.parentNode.name;
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
      this.videoUrl = this.videoBase + this.parentNode.video;
      //this.guideSentence = 'Try again :)'
    }

  }

  onListenToSentence(num: number){
    //1 is left, two is right
    if(num === 1){
      console.log(this.parentNode.leftChild.audio)
      this.audio.pause();
      this.audio.src = this.parentNode.leftChild.audio;
      this.audio.load();
      this.audio.play();
    }
    else if(num === 2){
      this.audio.pause();
      this.audio.src = this.parentNode.rightChild.audio;
      this.audio.load();
      this.audio.play();
    }
    else if(num === 3){
      this.notPlaying = !this.notPlaying;
      this.audio.pause();
      this.audio.src = this.parentNode.audio;
      this.audio.load();
      this.audio.play();
      // this.audio.onended(this.onStopListening())
      // setTimeout(()=> (this.onStopListening(),this.audio.duration));
    }
  }

  //Replay video -- not working because the source remains the same
  onReplayVideo(){
    this.videoUrl = this.videoBase + this.parentNode.video;
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
