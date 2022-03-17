import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobmodelComponent } from './jobmodel.component';

describe('JobmodelComponent', () => {
  let component: JobmodelComponent;
  let fixture: ComponentFixture<JobmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
