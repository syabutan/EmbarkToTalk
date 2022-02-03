import { Injectable } from '@angular/core';
import { Lesson2, Refference } from '../lesson.model';

@Injectable({
  providedIn: 'root'
})
export class ShadowSpanishService {
    public lesson1: Lesson2[] = [
        {
            id: '0',
            computer: 'Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
            player: 'Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
            video: '',
            voiceComputer: '../../assets/soundFile/shadowread/Me llamo Benjamin Brown.mp3',
            voicePlayer: '../../assets/soundFile/shadowread/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3'
        },        {
            id: '1',
            computer: 'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
            player: 'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
            video: '',
            voiceComputer: '../../assets/soundFile/shadowread/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3'
        },        {
            id: '2',
            computer: 'Como se llama su esposa?',
            player: 'Se llama Maria.',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Como se llama su esposa.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Se llama Maria.mp3'
        },        {
            id: '3',
            computer: 'Tienen hijos?',
            player: 'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Tienen hijos.mp3',
            voicePlayer: '../assets/soundFile/shadowread/No, no tenemos hijos.mp3'
        },        {
            id: '4',
            computer: 'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
            player: 'Ustedes estan aqui por trabjo?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Tenemos dos hijos.mp3',
            voicePlayer: '../assets/soundFile/shadowread/estan aqui por trabajo.mp3'
        },        {
            id: '5',
            computer: 'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos de los Ultimos Dias?',
            player: 'Si. Uno de mis amigos es miembro de esa iglesia.',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/somos misioneros.mp3',
            voicePlayer: '../assets/soundFile/shadowread/si uno de mis amigos es miembro.mp3'
        },        {
            id: '6',
            computer: 'Que sabe de la Iglesia?',
            player: 'No mucho, mi amigo habla poco de religion.',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Que sabe de la iglesia.mp3',
            voicePlayer: '../assets/soundFile/shadowread/No mucho.mp3'
        },        {
            id: '7',
            computer: 'Le gustaria aprender mas acerca de nuesta religion?',
            player: '',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/le gustaria aprender mas.mp3',
            voicePlayer: ''
        }]

    public lesson2: Lesson2[] = [
        {
            id: '0',
            computer: '',
            player: 'Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
            video: '',
            voiceComputer: '',
            voicePlayer: '../../assets/soundFile/shadowread/Me llamo Benjamin Brown.mp3'
        },        {
            id: '1',
            computer: 'Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
            player: 'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
            video: '',
            voiceComputer: '../../assets/soundFile/shadowread/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3',
            voicePlayer: '../../assets/soundFile/shadowread/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3'
        },        {
            id: '2',
            computer: 'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
            player: 'Como se llama su esposa?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Como se llama su esposa.mp3',
        },        {
            id: '3',
            computer: 'Se llama Maria.',
            player: 'Tienen hijos?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/Se llama Maria.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Tienen hijos.mp3'
        },        {
            id: '4',
            computer: 'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
            player: 'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/No, no tenemos hijos.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Tenemos dos hijos.mp3'
        },        {
            id: '5',
            computer: 'Ustedes estan aqui por trabjo?',
            player: 'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos de los Ultimos Dias?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/estan aqui por trabajo.mp3',
            voicePlayer: '../assets/soundFile/shadowread/somos misioneros.mp3'
        },        {
            id: '6',
            computer: 'Si. Uno de mis amigos es miembro de esa iglesia.',
            player: 'Que sabe de la Iglesia?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/si uno de mis amigos es miembro.mp3',
            voicePlayer: '../assets/soundFile/shadowread/Que sabe de la iglesia.mp3'
        },        {
            id: '7',
            computer: 'No mucho, mi amigo habla poco de religion.',
            player: 'Le gustaria aprender mas acerca de nuesta religion?',
            video: '',
            voiceComputer: '../assets/soundFile/shadowread/No mucho.mp3',
            voicePlayer: '../assets/soundFile/shadowread/le gustaria aprender mas.mp3'
        }]
    constructor(){}

    getAllArrays1() {
      return [...this.lesson1];
    }
    getAllArrays2() {
        return [...this.lesson2];
      }
}