import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingJobsComponent } from './pending-jobs.component';

describe('PendingJobsComponent', () => {
  let component: PendingJobsComponent;
  let fixture: ComponentFixture<PendingJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
