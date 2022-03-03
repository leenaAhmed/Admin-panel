import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExitComponent } from './model-exit.component';

describe('ModelExitComponent', () => {
  let component: ModelExitComponent;
  let fixture: ComponentFixture<ModelExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
