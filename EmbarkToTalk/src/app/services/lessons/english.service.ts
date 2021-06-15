import { Injectable } from '@angular/core';
import { Lesson, Refference } from '../lesson.model';


@Injectable({
  providedIn: 'root'
})
export class EnglishService {
  private lesson2: Lesson[] = [
    {
      id: '0',
      player: '',
      computer: '',
      video: ''
    },
    {
      id: '1',
      player: '',
      computer: 'Hello. How are you？', 
      video: '1,3' 
    },
    {
      id: '2',
      player: 'I\'m good, how are you?',
      computer: 'Good! What is your name? ', 
      video: '3,6' 
    },
    {
      id: '3',
      player: 'I\'m good. I\'m new here. Are you from here?', 
      computer: 'Awesome. I live here for 10 years. Why did you move here?',
      video: '6,13' 
    },
    {
      id: '4',
      player: 'My name is Elder Yamada. What\'s your name? ', 
      computer: 'My name is Hayato. It looks like you are doing something important. What are you doing?', 
      video: '13,18'
    },
    {
      id: '5',
      player: 'My name is Sister Tanaka. We are missionaries of the church of Jesus Christ of Later-day Saints.', 
      computer: 'I have never met missionaries. What are you guys doing?', 
      video: '19,23'
    },
    {
      id: '6',
      player: 'We are missionaries and teach about Jesus Christ.', 
      computer: 'I have never learned about Jesus Christ. ',
      video: '24,27'
    },
    {
      id: '7',
      player: 'We teach English and serve others as a volunteer. Are you interested in learning English？', 
      computer: 'I\'m interested in learning English.',
      video: '27,30'
    },
    {
      id: '8',
      player: 'We\'re missionaries. Have you met with missionaries before?', 
      computer: 'I have never met with missionaries.',
      video: '30,34'
    },
    {
      id: '9',
      player: 'We teach English and serve others as a volunteer. Are you interested in learning English？',  
      computer: 'I am interested in learning English.', 
      video: '34,36'
    },
    {
      id: '10',
      player: 'We teach English and serve others as a volunteer. Are you interested in learning English？',  
      computer: 'I\'m interested in learning English.',  
      video: '34,36'
    },
    {
      id: '11',
      player: 'We teach English and serve others as a volunteer. What are you doing？',   
      computer: 'I\'m a student at University.',  
      video: '37,40' 
    },
    {
      id: '12',
      player: 'Do you want to learn about Jesus Christ？',    
      computer: 'I\'m not interested.', 
      video: '40,43' 
    },
    {
      id: '13',
      player: 'Jesus Christ taught what is the most important in our life. What do you thing the most important in our life?',    
      computer: 'I think family is the most important.',  
      video: '43,48' 
    },
    {
      id: '14',
      player: 'We have English Class every Tuesday. Can we get your number？',    
      computer: 'I want to join the class. Sure！',  
      video: '48,51'
    },
    {
      id: '15',
      player: 'Great！Do you have any goals for learning English？',    
      computer: 'I want to speak with foreigners in English.',  
      video: '51,55'
    }]

  private refference: Refference[] = [
    {
      faceIcon: "../../../assets/icon/face/america.jpg",
      videoRef: "../assets/videos/JapaneseConversation.mp4#t=",
      voiceRef: "../../assets/soundFile/Japanese/"
    }]



    constructor(){}


    getAllArrays() {
      return [...this.lesson2];
    }

    getAllRef() {
      return [...this.refference];
    }
  }
