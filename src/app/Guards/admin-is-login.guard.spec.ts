import { TestBed } from '@angular/core/testing';

import { AdminIsLoginGuard } from './admin-is-login.guard';

describe('AdminIsLoginGuard', () => {
  let guard: AdminIsLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminIsLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
