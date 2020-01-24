import { TestBed, async, inject } from '@angular/core/testing';

import { CheckTokenGuard } from './check-token.guard';

describe('CheckTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckTokenGuard]
    });
  });

  it('should ...', inject([CheckTokenGuard], (guard: CheckTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
