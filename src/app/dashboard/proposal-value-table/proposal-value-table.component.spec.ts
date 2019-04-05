import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalValueTableComponent } from './proposal-value-table.component';

describe('ProposalValueTableComponent', () => {
  let component: ProposalValueTableComponent;
  let fixture: ComponentFixture<ProposalValueTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalValueTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalValueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
