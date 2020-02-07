import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEnagementsComponent } from './global-enagements.component';

describe('GlobalEnagementsComponent', () => {
  let component: GlobalEnagementsComponent;
  let fixture: ComponentFixture<GlobalEnagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEnagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEnagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
