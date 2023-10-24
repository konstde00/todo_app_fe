import {Component, OnInit} from "@angular/core";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationActions} from "@app/src/app/store/actions/authenticationActions";
import {AuthService} from "@app/src/app/services/authentication.service";
import {StorageService} from "@app/src/app/services/storage.service";
import {UserService} from "@app/src/app/services/user.service";
import {catchError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
    private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {

    this.socialAuthService.authState.subscribe((user) => {
      const responsePayload = this.decodeJWTToken(user.idToken);
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

    this.authService.login(this.username, this.password)
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
