import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {StorageService} from "@app/src/app/services/storage.service";

@Injectable()
export class AdminPanelGuard implements CanActivate {

    constructor(private router: Router,
                private storageService: StorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (this.storageService.getUser().autorities !== null && this.storageService.getUser().authorities !== undefined
        && this.storageService.getUser().authorities.includes("ROLE_ADMIN")) {
            return true;
        }
        this.router.navigate(['/admin'])
        return false;
    }
}
