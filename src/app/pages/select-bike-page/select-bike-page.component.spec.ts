import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBikePageComponent } from './select-bike-page.component';

describe('SelectBikePageComponent', () => {
  let component: SelectBikePageComponent;
  let fixture: ComponentFixture<SelectBikePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBikePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBikePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
