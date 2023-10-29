import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "@app/src/app/services/storage.service";
import {FeatureFlagEnum} from "@app/src/app/models/feature-flags.model";
import {environment} from "@app/src/environments/environment";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private storageService: StorageService) {
  }

  login(email: String, password: String ) {
    console.log("Api url: " + environment.apiHost)
    return this.http.post(`staging-todo-app-api-ext-9647-282134744.us-east-1.elb.amazonaws.com:80/api/authenticate/email`, {
      email: email,
      password: password,
      rememberMe: true
    });
  }

  isAccessToAnalyticsAllowed() {
    return this.storageService.getUser().featureFlags !== null && this.storageService.getUser().featureFlags !== undefined
    && this.storageService.getUser().featureFlags.includes(FeatureFlagEnum.ANALYTICS)
  }

  isAccessToAdminPanelAllowed() {
    return this.storageService.getUser().autorities !== null && this.storageService.getUser().authorities !== undefined
    && this.storageService.getUser().authorities.includes("ROLE_ADMIN")
  }

  logout() {
    this.storageService.clear();
  }
}
