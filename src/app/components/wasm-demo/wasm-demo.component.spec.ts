import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasmDemoComponent } from './wasm-demo.component';

describe('WasmDemoComponent', () => {
  let component: WasmDemoComponent;
  let fixture: ComponentFixture<WasmDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WasmDemoComponent]
    });
    fixture = TestBed.createComponent(WasmDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
