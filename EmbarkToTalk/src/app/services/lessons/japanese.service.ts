import { Injectable } from '@angular/core';
import { Lesson, Refference } from '../lesson.model';

@Injectable({
  providedIn: 'root'
})
export class JapaneseService {
  private lesson1: Lesson[] = [
    {
      id: '0',
      player: '',
      computer: '',
      video: ''
    },
    {
      id: '1',
      player: '',
      computer: 'こんにちは、元気ですか？',
      video: '1,3'
    },
    {
      id: '2',
      player: 'はい元気です。元気ですか？',
      computer: '元気です。お名前は何ですか？',
      video: '3,6'
    },
    {
      id: '3',
      player: 'はい元気です。私たちは最近この近くに引っ越してきました。地元の方ですか？',
      computer: 'そうなんですね。私はここに10年間住んでいます。何をしに引っ越してきたんですか？',
      video: '6,13'
    },
    {
      id: '4',
      player: '私は山田長老です。お名前は何ですか？',
      computer: '私ははやとです。お二人は何をしていますか？',
      video: '13,18'
    },
    {
      id: '5',
      player: '私は田中姉妹です。私たちは末日聖徒イエスキリスト教会の宣教師です。',
      computer: '宣教師には初めて会いました。何をしているんですか？',
      video: '19,23'
    },
    {
      id: '6',
      player: '私たちは宣教師で、イエスキリストについて教えています。',
      computer: 'キリストについては学んだことないですね。',
      video: '23.5,27'
    },
    {
      id: '7',
      player: '私たちはボランティアで英語を教えたり、奉仕したりしています。英語を学びたいですか？',
      computer: '英語は学んでみたいです。',
      video: '27,30'
    },
    {
      id: '8',
      player: '私たちは宣教師です。はやとさんは宣教師に会ったことがありますか？',
      computer: '宣教師には初めて会いました。',
      video: '30.7,34'
    },
    {
      id: '9',
      player: '私たちはボランティアで英語を教えたり、奉仕したりしています。英語を学びたいですか？',
      computer: '英語は学んでみたいです。',
      video: '34,36'
    },
    {
      id: '10',
      player: '私たちはボランティアで英語を教えたり、奉仕したりしています。英語を学びたいですか？',
      computer: '英語は学んでみたいです。',
      video: '34,36'
    },
    {
      id: '11',
      player: '私たちはボランティアで英語を教えたり、奉仕したりしています。はやとさんは何をしていますか？',
      computer: '僕は大学で勉強しています。',
      video: '37,40'
    },
    {
      id: '12',
      player: 'イエスキリストについて学んでみたいですか？',
      computer: 'キリスト教には興味ないです。',
      video: '40,44'
    },
    {
      id: '13',
      player: 'イエスキリストは、人生で一番大切なものについて教えていますが、はやとさんは人生で何が一番大切だと思いますか？',
      computer: 'たぶん家族が一番大切だと思います。',
      video: '44,48'
    },
    {
      id: '14',
      player: '毎週火曜日に英会話のクラスがあるので来ませんか？連絡先を交換しましょう！',
      computer: '行ってみたいです。いいですよ。',
      video: '48,51'
    },
    {
      id: '15',
      player: 'いいですね。英語の目標はありますか？',
      computer: '外国人と話せるようになりたいです。',
      video: '51,55'
    }]

  private refference: Refference[] = [{
      faceIcon: "assets/icon/face/face2.PNG",
      videoRef: "https://cdn.lang.mtc.byu.edu/conversation-tree/japanese.mp4#t=",
      voiceRef: "../../../../assets/soundFile/japanese/"
    }]
    constructor(){}

    getAllArrays() {
      return [...this.lesson1];
    }

    getAllRef() {
      return [...this.refference];
    }
  }
