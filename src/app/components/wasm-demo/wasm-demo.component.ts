import {Component, NgZone} from '@angular/core';
import { EmscriptenWasmComponent } from "../../wasm/emscripten-wasm.component";

@Component({
  selector: 'app-wasm-demo',
  templateUrl: './wasm-demo.component.html',
  styleUrls: ['./wasm-demo.component.css']
})
export class WasmDemoComponent extends EmscriptenWasmComponent {
  logItems: string[] = [];

  constructor(ngZone: NgZone) {
    super("ConsoleLoggerModule", "logger.js");

    this.moduleDecorator = (mod) => {
      mod.print = (what: string) => {
        ngZone.run(() => this.logItems.push(what));
      };
    };
  }
}
