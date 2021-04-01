import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  data = {
    firstChoice: '',
    secondChoice: '',
    userText: '',
    computerText: ''
  };

  constructor(private http: HttpClient) { }

  getSolution(): Observable<Solution> {
    return this.http.get<Solution>('assets/data.json')
      .pipe(
        map(res => {
          this.data.firstChoice = res.firstChoice;
          this.data.secondChoice = res.secondChoice;
          this.data.userText = res.userText;
          this.data.computerText = res.computerText;
          return this.data;
        })
      );
  }
}
