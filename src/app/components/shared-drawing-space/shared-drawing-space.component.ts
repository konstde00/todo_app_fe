
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shared-drawing-space',
  templateUrl: './shared-drawing-space.component.html',
  styleUrls: ['./shared-drawing-space.component.css']
})
export class SharedDrawingSpaceComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  drawing = false;

  ngOnInit() {
    // @ts-ignore
    this.context = this.canvas.nativeElement.getContext('2d');
    // Set up WebSocket connection
    // const ws = new WebSocket('ws://your-websocket-server-url');
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   this.draw(data.x, data.y, data.type);
    // };
  }

  draw(x: number, y: number, type: string) {
    if (type === 'mousedown') {
      this.context.beginPath();
      this.context.moveTo(x, y);
    } else if (type === 'mousemove' && this.drawing) {
      this.context.lineTo(x, y);
      this.context.stroke();
    } else if (type === 'mouseup' || type === 'mouseout') {
      this.context.closePath();
      this.drawing = false;
    }
  }

  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    const coordinates = { x: event.offsetX, y: event.offsetY, type: 'mousedown' };
    // Send the coordinates to the WebSocket server
    // ws.send(JSON.stringify(coordinates));
  }

  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      const coordinates = { x: event.offsetX, y: event.offsetY, type: 'mousemove' };
      // Send the coordinates to the WebSocket server
      // ws.send(JSON.stringify(coordinates));
      this.draw(event.offsetX, event.offsetY, 'mousemove');
    }
  }

  onMouseUp(event: MouseEvent) {
    this.drawing = false;
    const coordinates = { x: event.offsetX, y: event.offsetY, type: 'mouseup' };
    // Send the coordinates to the WebSocket server
    // ws.send(JSON.stringify(coordinates));
    this.draw(event.offsetX, event.offsetY, 'mouseup');
  }

  onMouseOut(event: MouseEvent) {
    this.drawing = false;
    const coordinates = { x: event.offsetX, y: event.offsetY, type: 'mouseout' };
    // Send the coordinates to the WebSocket server
    // ws.send(JSON.stringify(coordinates));
    this.draw(event.offsetX, event.offsetY, 'mouseout');
  }
}
