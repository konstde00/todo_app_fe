import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "@app/src/app/services/storage.service";
import {FeatureFlagEnum} from "@app/src/app/models/feature-flags.model";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private storageService: StorageService) {
  }

  login(username: String, password: String ) {
    return this.http.post("http://localhost:8080/api/authenticate/email", {
      username: username,
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
