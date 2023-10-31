import { Component } from '@angular/core';
import { AppToastService } from '@app/src/app/services/toast.service';
import {baseColors} from "ng2-charts";

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent {

  constructor(public toastService: AppToastService) {}

  protected readonly baseColors = baseColors;
}
