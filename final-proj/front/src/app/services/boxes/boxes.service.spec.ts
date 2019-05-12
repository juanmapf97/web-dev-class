import { TestBed } from '@angular/core/testing';

import { BoxesService } from './boxes.service';

describe('BoxesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxesService = TestBed.get(BoxesService);
    expect(service).toBeTruthy();
  });
});
