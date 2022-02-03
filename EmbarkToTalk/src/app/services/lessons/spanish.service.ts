import { Injectable } from '@angular/core';
import { Lesson2, Refference } from '../lesson.model';

@Injectable({
    providedIn: 'root'
  })
export class SpanishService {
    private lesson1: Lesson2[] = [
        {
            id: '0',
            player: '',
            computer: '',
            video: '6,6.0001',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '1',
            player: '',
            computer: '',
            video: '6,6.0001',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '2',
            player: '¿Disculpe, vive usted por aquí?',
            computer: 'No, solo estoy visitando.',
            video: '9,12',
            voicePlayer: '1.0',
            voiceComputer: '4.0'
        },        {
            id: '3',
            player: 'Perdón, apenas llegué aquí. ¿Conoce el área?',
            computer: 'Bueno. Apenas llegué con mi familia.',
            video: '2.5,6',
            voicePlayer: '2.0',
            voiceComputer: '3.0'
        },        {
            id: '4',
            player: '¡Que bien! ¿De dónde es?',
            computer: 'Mi familia es de México, pero me crecí en España.',
            video: '26,30',
            voicePlayer: '5.0',
            voiceComputer: '10.0'
        },        {
            id: '5',
            player: '¿Está visitando familia?',
            computer: 'Si. Vine para visitar mi mama y mis dos hermanos.',
            video: '62,66',
            voicePlayer: '8.0',
            voiceComputer: '13.0'
        },        {
            id: '6',
            player: '¡Que bien! ¿De dónde es?',
            computer: 'Soy de la cuidad de México.',
            video: '17.5,20',
            voicePlayer: '5.0',
            voiceComputer: '9.0'
        },        {
            id: '7',
            player: '¿Hace cuánto tiempo desde que llegó aquí?',
            computer: 'Bueno, me mudé a Estados Unidos hace un año, pero solo llevo unas semanas aquí.',
            video: '47,54',
            voicePlayer: '6.0',
            voiceComputer: '12.0'
        },        {
            id: '8',
            player: '¡Que bien! ¿Por qué vino por acá?',
            computer: 'Bueno. La situación es un poco complicada allí y vine aquí para trabajar.',
            video: '274,280',
            voicePlayer: '15.0',
            voiceComputer: '39'
        },        {
            id: '9',
            player: '¿He escuchado que España es hermosa, en que parte vivía?',
            computer: 'Bueno, vivía en Barcelona, ¿han visitado allí?',
            video: '83,87',
            voicePlayer: '16.0',
            voiceComputer: '20.0'
        },        {
            id: '10',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante?',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '49',
            voiceComputer: '50'
        },        {
            id: '11',
            player: '¡Que bien! ¿De dónde es?',
            computer: 'Mi familia es de México, pero me crecí en España.',
            video: '26,30',
            voicePlayer: '5.0',
            voiceComputer: '10.0'
        },        {
            id: '12',
            player: '¿En serio? Viví allí por un tiempo para aprender español.',
            computer: '¡Tú hablas muy bien! ¿Dónde viviste?',
            video: '177,181',
            voicePlayer: '34',
            voiceComputer: '36'
        },        {
            id: '13',
            player: 'He escuchado que México es muy bonito. ¿Por qué se mudó aquí?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '35',
            voiceComputer: '38'
        },        {
            id: '14',
            player: '¿En dónde vivía antes?',
            computer: 'Soy de la cuidad de México.',
            video: '17.5,20',
            voicePlayer: '17.0',
            voiceComputer: '9.0'
        },        {
            id: '15',
            player: '¿Qué tal los Estados Unidos? ¿Le gusta?',
            computer: 'Si me encanta. Espero que toda mi familia tenga la oportunidad de venir aquí un día.',
            video: '107,114',
            voicePlayer: '18.0',
            voiceComputer: '22.0'
        },        {
            id: '16',
            player: 'Si entiendo. ¿En que trabaja?',
            computer: 'Trabajo en una panadería. Necesito proveer por mi familia.',
            video: '614,619',
            voicePlayer: '87',
            voiceComputer: '89'
        },        {
            id: '17',
            player: 'Me imagino. De hecho tenemos una clase de ingles gratis, le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '88',
            voiceComputer: '76'
        },        {
            id: '18',
            player: '¡No, pero ojalá un día yo tenga la oportunidad! ¿Dijo que llegó con su familia, su familia es muy importante para usted entonces?',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '24',
            voiceComputer: '53'
        },        {
            id: '19',
            player: 'Aun no, pero tengo unos amigos de allí que viven aquí. ¿Por qué se mudó aquí?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '25',
            voiceComputer: '38'
        },        {
            id: '20',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '21',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '22',
            player: '¡Que bien! ¿Por qué vino por acá?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '15.0',
            voiceComputer: '38'
        },        {
            id: '23',
            player: '¿He escuchado que España es hermosa, en que parte vivía?',
            computer: 'Bueno, vivía en Barcelona, ¿han visitado allí?',
            video: '83,87',
            voicePlayer: '16.0',
            voiceComputer: '20.0'
        },        {
            id: '24',
            player: 'Somos misioneros y nuestra iglesia tiene un lugar para aprender español.',
            computer: 'He visto misioneros allí con camisas blancas. Creo que conocí a un misionero se llamaba Elder.',
            video: '300,307',
            voicePlayer: '40',
            voiceComputer: '44'
        },        {
            id: '25',
            player: '¿Conoce el hospital San Lucas? Allí cerquita.',
            computer: 'Si, lo conozco. Creo que he visto unos muchachos caminados por allí.',
            video: '441,446',
            voicePlayer: '65',
            voiceComputer: '66'
        },        {
            id: '26',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '27',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante?',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '28',
            player: '¿En serio? Viví allí por un tiempo para aprender español.',
            computer: '¿Fuiste a la CCM? Soy miembro de tu iglesia allí.',
            video: '189,194',
            voicePlayer: '34',
            voiceComputer: '37'
        },        {
            id: '29',
            player: 'He escuchado que México es muy bonito. ¿Por qué se mudó aquí?',
            computer: 'Bueno. La situación es un poco complicada allí y vine aquí para trabajar.',
            video: '274,280',
            voicePlayer: '35',
            voiceComputer: '39'
        },        {
            id: '30',
            player: 'Espero que puedan venir también. ¿De dónde es?',
            computer: 'Mi familia es de México, pero me crecí en España.',
            video: '26,30',
            voicePlayer: '26',
            voiceComputer: '10'
        },        {
            id: '31',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '49',
            voiceComputer: '53'
        },        {
            id: '32',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '33',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '49',
            voiceComputer: '53'
        },        {
            id: '34',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '35',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '36',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '64',
            voiceComputer: '76'
        },        {
            id: '37',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '38',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '43',
            voiceComputer: '70'
        },        {
            id: '39',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '40',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '41',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '42',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '43',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '44',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '45',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '46',
            player: '¡No, pero ojalá un día yo tenga la oportunidad! ¿Dijo que llegó con su familia, su familia es muy importante para usted entonces?',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '24',
            voiceComputer: '53'
        },        {
            id: '47',
            player: 'Aun no, pero tengo unos amigos de allí que viven aquí. ¿Por qué se mudó aquí?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '25.0',
            voiceComputer: '38'
        },        {
            id: '48',
            player: 'Bueno, estamos compartiendo un mensaje de Jesucristo. ¿Le gustaría escucharlo?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '19.0',
            voiceComputer: '76'
        },        {
            id: '49',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '50',
            player: 'Claro, hay misioneros allí también. ¿Ha hablado con misioneros antes?',
            computer: 'Unas veces, pero no mucho. Pero ya creo en Jesucristo.',
            video: '455,459',
            voicePlayer: '67',
            voiceComputer: '69'
        },        {
            id: '51',
            player: '¿De verdad? También hay un edificio allí que se llama el temple. Parece como un castillo blano. ¿Lo ha visto?',
            computer: 'Nunca he visto pero he escuchado de algo así.',
            video: '491,495',
            voicePlayer: '68',
            voiceComputer: '75'
        },        {
            id: '52',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '53',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '54',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '64',
            voiceComputer: '76'
        },        {
            id: '55',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '56',
            player: '¡Si! ¿Ha ido a la iglesia aquí?',
            computer: '¿Aun no, hay una iglesia que queda cerca?',
            video: '326,330',
            voicePlayer: '41',
            voiceComputer: '46'
        },        {
            id: '57',
            player: '¡Si! ¿Hace cuánto desde que se bautizó?',
            computer: 'Apenas dos años. Fue una experiencia muy linda.',
            video: '512,517',
            voicePlayer: '42',
            voiceComputer: '82'
        },        {
            id: '58',
            player: 'Si entiendo. ¿En que trabaja?',
            computer: 'Trabajo en una panadería. Necesito proveer por mi familia.',
            video: '614,619',
            voicePlayer: '87',
            voiceComputer: '89'
        },        {
            id: '59',
            player: 'Me imagino. De hecho tenemos una clase de ingles gratis, le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '88',
            voiceComputer: '76'
        },        {
            id: '60',
            player: '¡Que bien! ¿Por qué vino por acá?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '15.0',
            voiceComputer: '38'
        },        {
            id: '61',
            player: '¿He escuchado que España es hermosa, en que parte vivía?',
            computer: 'Bueno, vivía en Barcelona, ¿han visitado allí?',
            video: '83,87',
            voicePlayer: '16.0',
            voiceComputer: '20.0'
        },        {
            id: '62',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '63',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '64',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '65',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '66',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '67',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '68',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '69',
            player: '¿Podría repetirlo?',
            computer: 'Si, es 801-433-2278',
            video: '139.9,147',
            voicePlayer: '30',
            voiceComputer: '28'
        },        {
            id: '70',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '71',
            player: '¿Podría repetirlo?',
            computer: 'Si, es 801-433-2278',
            video: '139.9,147',
            voicePlayer: '30',
            voiceComputer: '28'
        },        {
            id: '72',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '73',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '74',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '75',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '76',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '77',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '78',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '64',
            voiceComputer: '76'
        },        {
            id: '79',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '80',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '81',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '82',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '83',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '84',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '85',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '86',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '87',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '88',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '89',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '90',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '91',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '92',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '93',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '94',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '95',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '96',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '97',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '98',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '99',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '100',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '64',
            voiceComputer: '76'
        },        {
            id: '101',
            player: '¡Qué bien! ¿Que tal si pasamos un día y hablamos sobre Jesucristo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '71',
            voiceComputer: '70'
        },        {
            id: '102',
            player: 'Está bien. Bueno, los templos son muy importantes porque nos ayuda tener una familia eterna. ¿Está bien si pasamos un día para hablar sobre como tener una familia eterna?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '77',
            voiceComputer: '76'
        },        {
            id: '103',
            player: 'No se preocupe.',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '73',
            voiceComputer: '53'
        },        {
            id: '104',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '105',
            player: '¿Podría repetirlo?',
            computer: 'Si, es 801-433-2278',
            video: '139.9,147',
            voicePlayer: '30',
            voiceComputer: '28'
        },        {
            id: '106',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '107',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '108',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '109',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '110',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '111',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '112',
            player: 'Si claro. Queda solo cinco minutos de aquí.',
            computer: 'No tengo carro y por eso no puedo ir.',
            video: '355,358',
            voicePlayer: '50',
            voiceComputer: '55'
        },        {
            id: '113',
            player: '¡Si! ¿Le gustaría venir con nosotros esta semana?',
            computer: 'No puedo esta semana, pero tal vez por la próxima.',
            video: '374,378',
            voicePlayer: '51',
            voiceComputer: '57'
        },        {
            id: '114',
            player: '¡Si! ¿Ha ido a la iglesia aquí?',
            computer: '¿Aun no, hay una iglesia que queda cerca?',
            video: '326,330',
            voicePlayer: '41',
            voiceComputer: '46'
        },        {
            id: '115',
            player: 'Está bien. ¿Nos gustaría conocerle, está bien si pasamos por su casa un día?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '48',
            voiceComputer: '76'
        },        {
            id: '116',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '117',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: 'Si claro, mi familia es la cosa más importante en mi vida.',
            video: '411,416',
            voicePlayer: '49',
            voiceComputer: '53'
        },        {
            id: '118',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '119',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '120',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: '¡Si claro!',
            video: '500,502.50',
            voicePlayer: '43',
            voiceComputer: '76'
        },        {
            id: '121',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '122',
            player: '¡No, pero ojalá un día yo tenga la oportunidad! ¿Dijo que llegó con su familia, su familia es muy importante para usted entonces?',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '24',
            voiceComputer: '54'
        },        {
            id: '123',
            player: 'Aun no, pero tengo unos amigos de allí que viven aquí. ¿Por qué se mudó aquí?',
            computer: 'Quería aprender inglés y también tengo familia aquí.',
            video: '202,206',
            voicePlayer: '25.0',
            voiceComputer: '38'
        },        {
            id: '124',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '125',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '126',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '127',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '128',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '129',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '130',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '131',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '132',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '133',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '134',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '135',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '136',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '137',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '138',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '139',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '140',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '141',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '142',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '143',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '144',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '145',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '146',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '147',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '148',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '149',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '150',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '151',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '152',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '153',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '154',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '155',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '156',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '157',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '158',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '159',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '160',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '161',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '162',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '163',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '164',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '165',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '166',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '167',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '168',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '169',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '170',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '171',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '172',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '173',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '174',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '175',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '176',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '177',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '178',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '179',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '180',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '181',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '182',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '183',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '184',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '185',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '186',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '187',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '188',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '189',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
                    },        {
            id: '190',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '191',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '192',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '193',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '194',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '195',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '196',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '197',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '198',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '199',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '200',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '201',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '202',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '203',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '204',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '205',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '206',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '207',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '208',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '209',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '210',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '211',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '212',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '213',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '214',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '215',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '216',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '217',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '218',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '219',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '220',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '221',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '222',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '223',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '224',
            player: 'No se preocupe, puede caminar con nosotros. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '59',
            voiceComputer: '28.0'
        },        {
            id: '225',
            player: '¡Está bien! Conocemos un miembro que puede darle transporte. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '60',
            voiceComputer: '28.0'
        },        {
            id: '226',
            player: '¿Está bien, podemos tener su número de teléfono para mandarle la dirección?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '62',
            voiceComputer: '28.0'
        },        {
            id: '227',
            player: '¡Muy bien! ¿Tiene una manera para llegar allí?',
            computer: 'Si tengo carro.',
            video: '629,631',
            voicePlayer: '63',
            voiceComputer: '91'
        },        {
            id: '228',
            player: 'Si claro. Queda solo cinco minutos de aquí.',
            computer: '¿En serio? ¡Voy esta semana!',
            video: '364,367',
            voicePlayer: '50',
            voiceComputer: '56'
        },        {
            id: '229',
            player: '¡Si! ¿Le gustaría venir con nosotros esta semana?',
            computer: 'No puedo esta semana, pero tal vez por la próxima.',
            video: '374,378',
            voicePlayer: '51',
            voiceComputer: '57'
        },        {
            id: '230',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '231',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '232',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '233',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '234',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '235',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '236',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '237',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '238',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '239',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '240',
            player: '¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '79',
            voiceComputer: '28.0'
        },        {
            id: '241',
            player: '¡Está bien! ¿Podemos tener su número de teléfono para fijar un día para venir a visitarle?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '80',
            voiceComputer: '28.0'
        },        {
            id: '242',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '243',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '244',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '245',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '246',
            player: 'De hecho, tenemos una clase de ingles gratis. ¿Le gustaría asistir?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '43',
            voiceComputer: '70'
        },        {
            id: '247',
            player: 'Tiene sentido. ¿Entonces usted cree que la familia es muy importante',
            computer: '¡Claro que sí! Por eso me mudé aquí.',
            video: '422,425',
            voicePlayer: '49',
            voiceComputer: '54'
        },        {
            id: '312',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '313',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '314',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '315',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '352',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '353',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '354',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '355',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '356',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '357',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '358',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '359',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '366',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '367',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '368',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '369',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '370',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '371',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '376',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '377',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '378',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '379',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '380',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '381',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '382',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '400',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '401',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '402',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '403',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '408',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '409',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '410',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '411',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '412',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '413',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '448',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '449',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '450',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '451',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '452',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '453',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '454',
            player: '¿Está bien, podemos tener su número de teléfono para mandarle la dirección?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '62',
            voiceComputer: '28.0'
        },        {
            id: '455',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '456',
            player: '¡Allí le esperamos! ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '61',
            voiceComputer: '28.0'
        },        {
            id: '457',
            player: '¡Muy bien! ¿Tiene una manera para llegar allí?',
            computer: 'No tengo carro y por eso no puedo ir.',
            video: '355,358',
            voicePlayer: '63',
            voiceComputer: '55'
        },        {
            id: '458',
            player: '¿Está bien, podemos tener su número de teléfono para mandarle la dirección?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '62',
            voiceComputer: '28.0'
        },        {
            id: '459',
            player: '¡Muy bien! ¿Tiene una manera para llegar allí?',
            computer: 'No tengo carro y por eso no puedo ir.',
            video: '355,358',
            voicePlayer: '63',
            voiceComputer: '55'
        },        {
            id: '460',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '461',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '462',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '463',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '464',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '465',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '466',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '467',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '468',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '469',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '480',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '481',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '482',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '483',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '484',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '485',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '488',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '489',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '492',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '493',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '494',
            player: 'Que bien. De hecho, estamos compartiendo un mensaje sobre la familia, ¿le gustaría escucharlo?',
            computer: 'No, realmente no tengo interés.',
            video: '468,471',
            voicePlayer: '64',
            voiceComputer: '70'
        },        {
            id: '495',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '908',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '909',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '912',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '913',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '914',
            player: 'No se preocupe, puede caminar con nosotros. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '59',
            voiceComputer: '28.0'
        },        {
            id: '915',
            player: '¡Está bien! Conocemos un miembro que puede darle transporte. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '60',
            voiceComputer: '28'
        },        {
            id: '916',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '917',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '918',
            player: 'No se preocupe, puede caminar con nosotros. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '59',
            voiceComputer: '28.0'
        },        {
            id: '919',
            player: '¡Está bien! Conocemos un miembro que puede darle transporte. ¿Nos daría su número de teléfono?',
            computer: 'Si, es 801-433-2278',
            video: '140,147',
            voicePlayer: '60',
            voiceComputer: '28'
        },        {
            id: '988',
            player: '¡Está bien, no hay problema! ¡Adiós!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '72',
            voiceComputer: '93'
        },        {
            id: '989',
            player: 'No se preocupe.',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '73',
            voiceComputer: '93'
        },        {
            id: '1828',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '1829',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '1830',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '1831',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '1836',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '1837',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        },        {
            id: '1838',
            player: '¡Muy bien gracias! ¡Hasta luego!',
            computer: '¡Gracias! ¡Adiós!',
            video: '634,636.50',
            voicePlayer: '29',
            voiceComputer: '93'
        },        {
            id: '1839',
            player: '',
            computer: '',
            video: '',
            voicePlayer: '',
            voiceComputer: ''
        }]

    private refference: Refference[] = [{
        faceIcon: "../../../assets/icon/sammy.png",
        videoRef: "https://cdn.lang.mtc.byu.edu/conversation-tree/spanish.mp4#t=",
        voiceRef: "../../../assets/soundFile/spanish-lesson/"
    }]
    constructor(){}

    getAllArrays() {
      return [...this.lesson1];
    }

    getAllRef() {
      return [...this.refference];
    }
}


