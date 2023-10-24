import { Component } from '@angular/core';
import {UserService} from "@app/src/app/services/user.service";
import {StorageService} from "@app/src/app/services/storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.css']
})
export class PasswordResetFinishComponent {

  public key: string = "";
  public newPassword: string = "";

  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router,
              private toastr: ToastrService) {

  }

  onSubmit() {

    this.userService.finishPasswordReset(this.newPassword, this.key)
      .subscribe(
        (data) => {
          this.storageService.saveUser(data);
          this.toastr.success("Your password has been successfully restored", 'Success', {});
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error', {});
        });
  }
}
