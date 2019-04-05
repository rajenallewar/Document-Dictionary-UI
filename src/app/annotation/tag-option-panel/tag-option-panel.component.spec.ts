import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagOptionPanelComponent } from './tag-option-panel.component';

describe('TagOptionPanelComponent', () => {
  let component: TagOptionPanelComponent;
  let fixture: ComponentFixture<TagOptionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagOptionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagOptionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
