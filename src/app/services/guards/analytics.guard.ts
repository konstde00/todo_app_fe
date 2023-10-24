import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {StorageService} from "@app/src/app/services/storage.service";
import {FeatureFlagEnum} from "@app/src/app/models/feature-flags.model";

@Injectable()
export class AnalyticsGuard implements CanActivate {

    constructor(private router: Router,
                private storageService: StorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (this.storageService.getUser().featureFlags !== null && this.storageService.getUser().featureFlags !== undefined
        && this.storageService.getUser().featureFlags.includes(FeatureFlagEnum.ANALYTICS)) {
            return true;
        }
        this.router.navigate(['/tasks'])
        return false;
    }
}
