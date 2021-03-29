import { Injectable } from '@angular/core';
import { Lang } from './lang.model';

@Injectable({
  providedIn: 'root'
})
export class LangsService {
  private langs: Lang[] = [
    {
      id: 'l1',
      value: 'en',
      name: 'English'
    },
    {
      id: 'l2',
      value: 'es',
      name: 'Spanish'
    },
    {
      id: 'l3',
      value: 'de',
      name: 'German'
    },
    {
      id: 'l4',
      value: 'ar',
      name: 'Arabic'
    },
    {
      id: 'l5',
      value: 'ja',
      name: 'Japanese'
    }
  ];

  constructor() { }

  getAllLangs() {
    return [...this.langs];
  }

  getLang(langId: string) {
    return {
      ...this.langs.find(lang => {
        return lang.id == langId;
      })
    };
  }
}
