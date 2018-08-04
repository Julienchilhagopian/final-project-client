import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeParkFormComponent } from './bike-park-form.component';

describe('BikeParkFormComponent', () => {
  let component: BikeParkFormComponent;
  let fixture: ComponentFixture<BikeParkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeParkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeParkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
