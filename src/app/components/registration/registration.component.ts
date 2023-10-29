import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UserService} from "@app/src/app/services/user.service";
import {StorageService} from "@app/src/app/services/storage.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public email: string = "";
  public password: string = "";

  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router,
              private toastr: ToastrService) {

  }

  onSubmit() {

    this.userService.register(this.email, this.password)
      .subscribe(
        (data) => {
          this.storageService.saveUser(data);
          this.toastr.success("Your account has been successfully created", 'Success', {});
          this.router.navigate(['tasks']);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error', {});
        });
  }
}
