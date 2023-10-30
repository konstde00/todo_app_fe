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
    return this.http.post(`${environment.apiHost}/api/authenticate/email`, {
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
