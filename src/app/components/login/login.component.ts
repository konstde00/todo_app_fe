import { Component, OnInit } from "@angular/core";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";

  constructor(private router: Router,
              private authService: SocialAuthService) { }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      console.log(JSON.stringify(user))
      const responsePayload = this.decodeJWTToken(user.idToken);
      // responsePayload.idToken = user.idToken;
      sessionStorage.setItem("auth", JSON.stringify(responsePayload));
      this.router.navigate(['profile']);
    });
  }

  decodeJWTToken(token: String) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  onSubmit() {
    console.log(`Username: ${this.username}, Password: ${this.password}`);
  }
}
