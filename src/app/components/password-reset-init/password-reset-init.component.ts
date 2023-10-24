import { Component } from '@angular/core';
import {UserService} from "@app/src/app/services/user.service";
import {StorageService} from "@app/src/app/services/storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['./password-reset-init.component.css']
})
export class PasswordResetInitComponent {

  public email: string = "";

  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router,
              private toastr: ToastrService) {

  }

  onSubmit() {

    this.userService.initPasswordReset(this.email)
      .subscribe(
        (data) => {
          this.storageService.saveUser(data);
          this.toastr.success("Email with verification code has been sent successfully", 'Success', {});
          this.router.navigate(['/password-reset/finish']);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error', {});
        });
  }
}
