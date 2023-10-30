import {Component, OnInit, ViewChild} from "@angular/core";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationActions} from "@app/src/app/store/actions/authenticationActions";
import {AuthService} from "@app/src/app/services/authentication.service";
import {StorageService} from "@app/src/app/services/storage.service";
import {UserService} from "@app/src/app/services/user.service";
import {catchError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "@app/src/environments/environment";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  public saving: boolean = false;

  public password: string = "";

  email = new FormControl('', [Validators.required,
    Validators.pattern('[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|localhost)')
  ]);
  @ViewChild('validEmail') validEmail: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      const responsePayload = this.decodeJWTToken(user.idToken);
      //@ts-ignore
      responsePayload.imageUrl = user.photoUrl == null ? user.picture : user.photoUrl;
      responsePayload.token = user.idToken;
      this.storageService.saveUser(responsePayload);
      this.userService.syncWithIdp(user.idToken).subscribe(
        () => {
          this.router.navigate(['tasks']);
        }
      );
    });
  }

  decodeJWTToken(token: String) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  onSubmit() {

    if (this.email.value !== null) {

      this.authService.login(this.email.value, this.password)
        .subscribe(
          (data) => {
            console.log(data);
            this.storageService.saveUser(data);
            this.router.navigate(['tasks'])
          },
          (error) => {
            this.toastr.error(error.error.message, 'Error', {});
          });
    }
  }
}
