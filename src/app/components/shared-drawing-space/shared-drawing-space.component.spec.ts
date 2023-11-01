import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDrawingSpaceComponent } from './shared-drawing-space.component';

describe('SharedDrawingSpaceComponent', () => {
  let component: SharedDrawingSpaceComponent;
  let fixture: ComponentFixture<SharedDrawingSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedDrawingSpaceComponent]
    });
    fixture = TestBed.createComponent(SharedDrawingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
