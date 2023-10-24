import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetInitComponent } from './password-reset-init.component';

describe('PasswordResetInitComponent', () => {
  let component: PasswordResetInitComponent;
  let fixture: ComponentFixture<PasswordResetInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetInitComponent]
    });
    fixture = TestBed.createComponent(PasswordResetInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
