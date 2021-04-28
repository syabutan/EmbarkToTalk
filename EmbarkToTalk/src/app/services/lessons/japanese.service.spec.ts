import { TestBed } from '@angular/core/testing';

import { JapaneseService } from './japanese.service';

describe('JapaneseService', () => {
  let service: JapaneseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JapaneseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
