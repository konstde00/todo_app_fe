import {Component, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UserService} from "@app/src/app/services/user.service";
import {StorageService} from "@app/src/app/services/storage.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  public saving: boolean = false;

  public password: string = "";

  email = new FormControl('', [Validators.required,
    Validators.pattern('[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|localhost)')
  ]);
  @ViewChild('validEmail') validEmail: any;

  constructor(private userService: UserService,
              private storageService: StorageService,
              private router: Router,
              private toastr: ToastrService) {

  }

  onSubmit() {

    if (this.email.value !== null) {

      this.userService.register(this.email.value, this.password)
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
}
