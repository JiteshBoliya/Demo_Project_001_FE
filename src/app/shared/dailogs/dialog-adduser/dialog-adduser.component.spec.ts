import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdduserComponent } from './dialog-adduser.component';

describe('DialogAdduserComponent', () => {
  let component: DialogAdduserComponent;
  let fixture: ComponentFixture<DialogAdduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
