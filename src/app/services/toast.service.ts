import {Injectable} from "@angular/core";

export interface ToastInfo {
  header: string;
  body: string;
  classname: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class AppToastService {
  toasts: ToastInfo[] = [];

  showSuccess(header: string, body: string) {
    this.toasts.push({ header, body, classname: "md-toast success" });
  }

  showError(header: string, body: string) {
    this.toasts.push({ header, body, classname: "md-toast error" });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
